import { NextRequest, NextResponse } from "next/server";
import { validateAuthorizationHeader } from "@/lib/proxy";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/api/customers")) {
    return NextResponse.next();
  }

  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
  }

  const token = validateAuthorizationHeader(request.headers.get("authorization"));
  if (!token) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401, headers: corsHeaders },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/customers/:path*"],
};
