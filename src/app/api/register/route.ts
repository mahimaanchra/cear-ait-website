import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { isSupabaseConfigured, getSupabaseServerClient } from "@/lib/supabase";

const LOCAL_DATA_PATH = path.join(process.cwd(), "src", "data", "registrations.json");
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "cear@2026";

export interface RegistrationRecord {
  id: string;
  registration_type: "inductions" | "wartech";
  applicant_name: string;
  email: string;
  phone?: string;
  track_or_domain: string;
  team_name?: string;
  team_size?: string;
  college?: string;
  statement?: string;
  meta?: Record<string, any>;
  status: "pending" | "verified" | "shortlisted" | "rejected";
  created_at: string;
}

// Helper to read local registrations
async function getLocalRegistrations(): Promise<RegistrationRecord[]> {
  try {
    const exists = await fs.access(LOCAL_DATA_PATH).then(() => true).catch(() => false);
    if (!exists) return [];
    const raw = await fs.readFile(LOCAL_DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Helper to save local registrations
async function saveLocalRegistration(record: RegistrationRecord) {
  try {
    const current = await getLocalRegistrations();
    current.unshift(record);
    await fs.writeFile(LOCAL_DATA_PATH, JSON.stringify(current, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not write to local registrations.json:", err);
  }
}

// POST: Submit a new registration (Inductions or Wartech)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      registration_type,
      applicant_name,
      email,
      phone,
      track_or_domain,
      team_name,
      team_size,
      college,
      statement,
      meta,
    } = body;

    if (!registration_type || !applicant_name || !email || !track_or_domain) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: registration_type, applicant_name, email, track_or_domain" },
        { status: 400 }
      );
    }

    const prefix = registration_type === "wartech" ? "CEAR-WT" : "CEAR-IND";
    const regId = `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date().toISOString();

    const record: RegistrationRecord = {
      id: regId,
      registration_type,
      applicant_name,
      email,
      phone: phone || "",
      track_or_domain,
      team_name: team_name || "",
      team_size: team_size || "",
      college: college || "Army Institute of Technology, Pune",
      statement: statement || "",
      meta: meta || {},
      status: "pending",
      created_at: now,
    };

    let cloudSaved = false;

    // 1. Supabase persistence
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseServerClient();
      if (supabase) {
        const { error: dbError } = await supabase.from("registrations").insert([record]);
        if (!dbError) {
          cloudSaved = true;
        } else {
          console.warn("Supabase registration insert warning:", dbError.message);
        }
      }
    }

    // 2. Local fallback
    await saveLocalRegistration(record);

    return NextResponse.json({
      success: true,
      id: regId,
      cloudSaved,
      message: "Registration submitted successfully!",
      record,
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process registration" },
      { status: 500 }
    );
  }
}

// GET: Retrieve registrations (for /admin panel)
export async function GET(request: Request) {
  const authHeader = request.headers.get("x-admin-passcode");
  if (authHeader !== ADMIN_PASSCODE) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  // If Supabase is configured, fetch from cloud
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return NextResponse.json({ success: true, registrations: data, provider: "supabase" });
      }
    }
  }

  // Fallback to local
  const localData = await getLocalRegistrations();
  return NextResponse.json({ success: true, registrations: localData, provider: "local" });
}
