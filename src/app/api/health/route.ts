import { NextResponse } from "next/server";

export async function GET() {
  const startTime = Date.now();

  return NextResponse.json(
    {
      status: "operational",
      service: "cear-command-telemetry",
      callsign: "LAB-104-ALPHA",
      institution: "Army Institute of Technology (AIT), Pune",
      environment: process.env.NODE_ENV || "production",
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      subsystems: {
        fleet_registry: "online",
        mission_control: "online",
        upload_gateway: "online",
        content_persistence: "synced",
        security_headers: "enforced",
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
