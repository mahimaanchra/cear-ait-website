import { NextResponse } from "next/server";
import { checkSupabaseHealth } from "@/lib/supabase";

export async function GET() {
  const startTime = Date.now();

  const supabaseHealth = await checkSupabaseHealth();
  const mem = process.memoryUsage();

  return NextResponse.json(
    {
      status: "operational",
      service: "cear-command-telemetry",
      callsign: "LAB-104-ALPHA",
      institution: "Army Institute of Technology (AIT), Pune",
      environment: process.env.NODE_ENV || "production",
      runtime: {
        nodeVersion: process.version,
        platform: process.platform,
        uptimeSeconds: Math.floor(process.uptime()),
        memory: {
          heapUsedMb: Math.round((mem.heapUsed / 1024 / 1024) * 10) / 10,
          heapTotalMb: Math.round((mem.heapTotal / 1024 / 1024) * 10) / 10,
          rssMb: Math.round((mem.rss / 1024 / 1024) * 10) / 10,
        },
      },
      timestamp: new Date().toISOString(),
      subsystems: {
        fleet_registry: "online",
        mission_control: "online",
        upload_gateway: "online",
        content_persistence: "synced",
        security_headers: "enforced",
        supabase_cloud: supabaseHealth.configured
          ? supabaseHealth.reachable
            ? `healthy (${supabaseHealth.latencyMs}ms)`
            : `unreachable (${supabaseHealth.error || "unknown"})`
          : "local_fallback (offline)",
      },
      latencyMs: Date.now() - startTime,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}

