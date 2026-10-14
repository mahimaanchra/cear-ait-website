import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { isSupabaseConfigured, getSupabaseServerClient } from "@/lib/supabase";

const LOCAL_DATA_PATH = path.join(process.cwd(), "src", "data", "inquiries.json");
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "cear@2026";

export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "responded" | "archived";
  created_at: string;
}

const DEFAULT_SAMPLE_INQUIRIES: InquiryRecord[] = [
  {
    id: "INQ-CEAR-DEMO-001",
    name: "Lt. Col. Vikramaditya Rathore",
    email: "rathore.v@mod.gov.in",
    subject: "Industrial & Defense Telemetry Showcase",
    message:
      "Greetings CEAR Team. We were impressed with the Jalpari AUV demonstration at Techniche. Would like to schedule an technical evaluation session at Lab 104 regarding your ROS2 edge perception stack.",
    status: "unread",
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "INQ-CEAR-DEMO-002",
    name: "Aarav Sharma (COEP Robotics)",
    email: "aarav.sharma@coep.ac.in",
    subject: "Wartech 2026 - Combat Arena Weight Classes",
    message:
      "Hello team, we are designing a 15kg pneumatic drum spinner for Wartech. Could you please clarify if dual-battery LiPo isolating switches are mandatory during the pit safety inspection?",
    status: "unread",
    created_at: new Date(Date.now() - 3600000 * 26).toISOString(),
  },
  {
    id: "INQ-CEAR-DEMO-003",
    name: "Prof. Pooja Deshmukh",
    email: "p.deshmukh@sppu.edu",
    subject: "Joint Workshop on Edge AI & Jetson Accelerators",
    message:
      "We would like to invite CEAR cadets to conduct a 2-day hands-on workshop on embedded TensorRT and Jetson Orin Nano for SPPU electronics students.",
    status: "responded",
    created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
  },
];

async function getLocalInquiries(): Promise<InquiryRecord[]> {
  try {
    const exists = await fs.access(LOCAL_DATA_PATH).then(() => true).catch(() => false);
    if (!exists) {
      await fs.mkdir(path.dirname(LOCAL_DATA_PATH), { recursive: true });
      await fs.writeFile(LOCAL_DATA_PATH, JSON.stringify(DEFAULT_SAMPLE_INQUIRIES, null, 2), "utf-8");
      return DEFAULT_SAMPLE_INQUIRIES;
    }
    const raw = await fs.readFile(LOCAL_DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_SAMPLE_INQUIRIES;
  } catch {
    return DEFAULT_SAMPLE_INQUIRIES;
  }
}

async function saveLocalInquiry(record: InquiryRecord) {
  try {
    const current = await getLocalInquiries();
    current.unshift(record);
    await fs.writeFile(LOCAL_DATA_PATH, JSON.stringify(current, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not write to local inquiries.json:", err);
  }
}

// POST: Submit a new inquiry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const id = `INQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date().toISOString();

    const record: InquiryRecord = {
      id,
      name,
      email,
      subject: subject || "General Inquiry",
      message,
      status: "unread",
      created_at: now,
    };

    let cloudSaved = false;

    // 1. Supabase persistence
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseServerClient();
      if (supabase) {
        const { data: dbData, error: dbError } = await supabase
          .from("inquiries")
          .insert([
            {
              name: record.name,
              email: record.email,
              subject: record.subject,
              message: record.message,
              status: record.status,
              created_at: record.created_at,
            },
          ])
          .select("id")
          .single();

        if (!dbError) {
          cloudSaved = true;
          if (dbData?.id) {
            record.id = dbData.id;
          }
        } else {
          console.warn("Supabase inquiry insert warning:", dbError.message);
        }
      }
    }

    // 2. Local fallback
    await saveLocalInquiry(record);

    return NextResponse.json({
      success: true,
      id: record.id,
      cloudSaved,
      message: "Inquiry received. The CEAR team will contact you shortly.",
      record,
    });
  } catch (error: any) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process inquiry" },
      { status: 500 }
    );
  }
}

// GET: Retrieve inquiries for /admin
export async function GET(request: Request) {
  const authHeader = request.headers.get("x-admin-passcode");
  if (authHeader !== ADMIN_PASSCODE) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return NextResponse.json({ success: true, inquiries: data, provider: "supabase" });
      }
    }
  }

  const localData = await getLocalInquiries();
  return NextResponse.json({ success: true, inquiries: localData, provider: "local" });
}

// PATCH: Update inquiry status (for /admin panel)
export async function PATCH(request: Request) {
  const authHeader = request.headers.get("x-admin-passcode");
  if (authHeader !== ADMIN_PASSCODE) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: id, status" },
        { status: 400 }
      );
    }

    const validStatuses = ["unread", "responded", "archived"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status: ${status}. Must be one of ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    let updatedRecord: InquiryRecord | null = null;

    // 1. Update in Supabase if configured
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseServerClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("inquiries")
          .update({ status })
          .eq("id", id)
          .select()
          .single();

        if (!error && data) {
          updatedRecord = data;
        }
      }
    }

    // 2. Update local inquiries.json
    try {
      const current = await getLocalInquiries();
      const index = current.findIndex((item) => String(item.id) === String(id));
      if (index !== -1) {
        current[index].status = status;
        await fs.writeFile(LOCAL_DATA_PATH, JSON.stringify(current, null, 2), "utf-8");
        if (!updatedRecord) {
          updatedRecord = current[index];
        }
      }
    } catch (err) {
      console.warn("Could not update local inquiries.json:", err);
    }

    if (!updatedRecord) {
      return NextResponse.json({ success: false, error: "Inquiry record not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Inquiry status updated to ${status}`,
      inquiry: updatedRecord,
    });
  } catch (error: any) {
    console.error("Update inquiry error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update inquiry status" },
      { status: 500 }
    );
  }
}

// DELETE: Delete an inquiry (for /admin panel)
export async function DELETE(request: Request) {
  const authHeader = request.headers.get("x-admin-passcode");
  if (authHeader !== ADMIN_PASSCODE) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing inquiry ID parameter" }, { status: 400 });
    }

    let deletedFromCloud = false;

    // 1. Delete from Supabase if configured
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseServerClient();
      if (supabase) {
        const { error } = await supabase
          .from("inquiries")
          .delete()
          .eq("id", id);

        if (!error) {
          deletedFromCloud = true;
        }
      }
    }

    // 2. Delete from local inquiries.json
    let deletedLocally = false;
    try {
      const current = await getLocalInquiries();
      const filtered = current.filter((item) => String(item.id) !== String(id));
      if (filtered.length !== current.length) {
        await fs.writeFile(LOCAL_DATA_PATH, JSON.stringify(filtered, null, 2), "utf-8");
        deletedLocally = true;
      }
    } catch (err) {
      console.warn("Could not remove from local inquiries.json:", err);
    }

    if (!deletedFromCloud && !deletedLocally) {
      return NextResponse.json({ success: false, error: "Inquiry not found or could not be deleted" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Inquiry ${id} permanently deleted`,
      id,
    });
  } catch (error: any) {
    console.error("Delete inquiry error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
