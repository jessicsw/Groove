import { NextResponse, NextRequest } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)",
  ],
};

export default function middleware(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("GROOVE_ACCESS_TOKEN")?.value;
  const authPage = new URL("/login", req.url);
  if (!token) {
    return NextResponse.redirect(authPage);
  }
}
