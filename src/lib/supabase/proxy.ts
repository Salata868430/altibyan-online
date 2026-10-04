import { NextResponse, type NextRequest } from "next/server";
import { verifyAdminToken } from "@/lib/admin-auth";

export async function updateSession(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 1. Check Master Admin Session Cookie
  const adminCookie = request.cookies.get("altibyan_admin_session")?.value;
  if (adminCookie) {
    const { valid } = verifyAdminToken(adminCookie);
    if (valid) {
      // If already logged in and visiting login page, redirect to dashboard
      if (path === "/admin/login") {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/dashboard";
        return NextResponse.redirect(url);
      }
      return NextResponse.next({ request });
    }
  }

  // 2. Allow access to /admin/login freely
  if (path === "/admin/login") {
    return NextResponse.next({ request });
  }

  // 3. Not authenticated: redirect any other /admin routes to /admin/login
  if (path.startsWith("/admin")) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next({ request });
}
