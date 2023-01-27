//At this directory level, this middleware will fire first before any of the apis under /pages/api

// This runs in a webworker-like environment.
// Will not run in node env, so we can't check user
import { NextResponse, NextRequest } from "next/server";

const signedInPages = ["/", "/playlist", "/library"];

export default function middleware(req: NextRequest) {
  if (signedInPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.get("GROOVE_ACCESS_TOKEN")?.value;
    const authPage = new URL("/login", req.url);
    if (!token) {
      return NextResponse.redirect(authPage);
    }
  }
}
