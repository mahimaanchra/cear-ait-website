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

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "customContent.json");

interface SiteContentPayload {
  facultyIncharge?: typeof facultyIncharge;
  secretaries?: typeof secretaries;
  jointSecretaries?: typeof jointSecretaries;
  coreContributors?: typeof coreContributors;
  upcomingEvents?: typeof upcomingEvents;
  projects?: typeof projects;
  lastUpdated?: string;
}

export async function GET() {
  try {
    const fileExists = await fs
      .access(DATA_FILE_PATH)
      .then(() => true)
      .catch(() => false);

    if (fileExists) {
      const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
      return NextResponse.json(JSON.parse(data));
    }

    // Default payload if file doesn't exist yet
    const defaultData: SiteContentPayload = {
      facultyIncharge,
      secretaries,
      jointSecretaries,
      coreContributors,
      upcomingEvents,
      projects,
      lastUpdated: new Date().toISOString(),
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
      },
      { status: 200 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: SiteContentPayload = await request.json();
    body.lastUpdated = new Date().toISOString();

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(body, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Content successfully updated and persisted on server.",
      data: body,
    });
  } catch (error) {
    console.error("Error saving custom content:", error);
    return NextResponse.json(
      { success: false, error: "Failed to write data file" },
      { status: 500 }
    );
  }
}
