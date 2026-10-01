import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import {
  facultyIncharge,
  secretaries,
  jointSecretaries,
  coreContributors,
  upcomingEvents,
  projects,
} from "@/data/siteData";
import { isSupabaseConfigured, getSupabaseServerClient } from "@/lib/supabase";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "customContent.json");

interface SiteContentPayload {
  facultyIncharge?: typeof facultyIncharge;
  secretaries?: typeof secretaries;
  jointSecretaries?: typeof jointSecretaries;
  coreContributors?: typeof coreContributors;
  upcomingEvents?: typeof upcomingEvents;
  projects?: typeof projects;
  lastUpdated?: string;
  cloudConnected?: boolean;
}

export async function GET() {
  const isCloud = isSupabaseConfigured();

  // 1. If Supabase is configured, try to fetch from cloud database
  if (isCloud) {
    try {
      const supabase = getSupabaseServerClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("site_content")
          .select("payload, updated_at")
          .eq("id", "main")
          .single();

        if (!error && data?.payload) {
          return NextResponse.json({
            ...data.payload,
            cloudConnected: true,
            lastUpdated: data.updated_at,
          });
        }
      }
    } catch (cloudErr) {
      console.warn("Could not read from Supabase site_content table:", cloudErr);
    }
  }

  // 2. Local fallback from customContent.json
  try {
    const fileExists = await fs
      .access(DATA_FILE_PATH)
      .then(() => true)
      .catch(() => false);

    if (fileExists) {
      const fileData = await fs.readFile(DATA_FILE_PATH, "utf-8");
      const parsed = JSON.parse(fileData);
      return NextResponse.json({
        ...parsed,
        cloudConnected: isCloud,
      });
    }

    // Default seed payload
    const defaultData: SiteContentPayload = {
      facultyIncharge,
      secretaries,
      jointSecretaries,
      coreContributors,
      upcomingEvents,
      projects,
      lastUpdated: new Date().toISOString(),
      cloudConnected: isCloud,
    };

    return NextResponse.json(defaultData);
  } catch (error) {
    console.error("Error reading custom content:", error);
    return NextResponse.json(
      {
        facultyIncharge,
        secretaries,
        jointSecretaries,
        coreContributors,
        upcomingEvents,
        projects,
        cloudConnected: isCloud,
      },
      { status: 200 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: SiteContentPayload = await request.json();
    const now = new Date().toISOString();
    body.lastUpdated = now;

    let cloudSaved = false;

    // 1. If Supabase is configured, upsert into site_content table
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseServerClient();
      if (supabase) {
        const { error: dbError } = await supabase
          .from("site_content")
          .upsert({
            id: "main",
            payload: body,
            updated_at: now,
          });

        if (dbError) {
          console.warn("Supabase upsert warning:", dbError.message);
        } else {
          cloudSaved = true;
        }
      }
    }

    // 2. Also save to local customContent.json (for local dev & offline caching)
    try {
      await fs.writeFile(
        DATA_FILE_PATH,
        JSON.stringify(body, null, 2),
        "utf-8"
      );
    } catch (fsErr) {
      // In read-only serverless environments like Vercel, fs.writeFile might throw
      console.warn("Local filesystem write skipped/failed:", fsErr);
    }

    return NextResponse.json({
      success: true,
      cloudSaved,
      cloudConnected: isSupabaseConfigured(),
      message: cloudSaved
        ? "Content successfully synced to Supabase Cloud Database!"
        : "Content saved to local file system.",
      data: body,
    });
  } catch (error: any) {
    console.error("Error saving custom content:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to write data" },
      { status: 500 }
    );
  }
}
