import { NextRequest, NextResponse } from "next/server";
import { validateAuthorizationHeader } from "@/lib/proxy";

export function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/api/customers")) {
    return NextResponse.next();
  }

  const token = validateAuthorizationHeader(request.headers.get("authorization"));
  if (!token) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/customers/:path*"],
};
