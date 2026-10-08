// app/api/health/route.ts
// A simple health-check endpoint to verify the API layer is wired up.

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { status: "ok", service: "balaji-jyotish-api", timestamp: new Date().toISOString() },
    { status: 200 }
  );
}
