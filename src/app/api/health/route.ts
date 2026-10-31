import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: siteConfig.name,
    version: siteConfig.version,
    timestamp: new Date().toISOString(),
  });
}
