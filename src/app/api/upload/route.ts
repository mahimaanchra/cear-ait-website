import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import {
  isSupabaseConfigured,
  getSupabaseServerClient,
  SUPABASE_BUCKET_NAME,
} from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Basic file type validation
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Limit size to 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Clean filename
    const ext = path.extname(file.name) || ".jpg";
    const baseName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .slice(0, 30);
    const uniqueFileName = `${Date.now()}-${baseName}${ext}`;

    // 1. If Supabase is configured, upload to cloud storage bucket
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseServerClient();
      if (supabase) {
        const filePath = `${folder}/${uniqueFileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(SUPABASE_BUCKET_NAME)
          .upload(filePath, buffer, {
            contentType: file.type,
            upsert: true,
          });

        if (!uploadError && uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from(SUPABASE_BUCKET_NAME)
            .getPublicUrl(filePath);

          return NextResponse.json({
            success: true,
            url: publicUrlData.publicUrl,
            provider: "supabase",
            fileName: uniqueFileName,
          });
        }

        console.warn(
          "Supabase upload failed, falling back to local storage:",
          uploadError?.message
        );
      }
    }

    // 2. Local fallback (saves to /public/uploads/)
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const localFilePath = path.join(uploadDir, uniqueFileName);
    await fs.writeFile(localFilePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${uniqueFileName}`,
      provider: "local",
      fileName: uniqueFileName,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}
