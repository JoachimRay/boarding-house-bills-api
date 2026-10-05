import { NextResponse } from "next/server";
import { getProfile } from "@/lib/auth";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(request: Request) {
  const profile = await getProfile(request);
  if (!profile) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401, headers: corsHeaders },
    );
  }
  return NextResponse.json(profile, { headers: corsHeaders });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}