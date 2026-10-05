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

async function getLocalInquiries(): Promise<InquiryRecord[]> {
  try {
    const exists = await fs.access(LOCAL_DATA_PATH).then(() => true).catch(() => false);
    if (!exists) return [];
    const raw = await fs.readFile(LOCAL_DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
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
        const { error: dbError } = await supabase.from("inquiries").insert([
          {
            name: record.name,
            email: record.email,
            subject: record.subject,
            message: record.message,
            status: record.status,
            created_at: record.created_at,
          },
        ]);
        if (!dbError) {
          cloudSaved = true;
        } else {
          console.warn("Supabase inquiry insert warning:", dbError.message);
        }
      }
    }

    // 2. Local fallback
    await saveLocalInquiry(record);

    return NextResponse.json({
      success: true,
      id,
      cloudSaved,
      message: "Inquiry received. The CEAR team will contact you shortly.",
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

      if (!error && data) {
        return NextResponse.json({ success: true, inquiries: data, provider: "supabase" });
      }
    }
  }

  const localData = await getLocalInquiries();
  return NextResponse.json({ success: true, inquiries: localData, provider: "local" });
}
