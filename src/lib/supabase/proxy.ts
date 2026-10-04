import { NextResponse, type NextRequest } from "next/server";
import { verifyAdminToken } from "@/lib/admin-auth";
import { getSupabaseConfig, isSupabaseConfigured } from "./config";
import { createServerClient } from "@supabase/ssr";

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

  // 3. Fallback: Check Supabase session only if configured
  if (isSupabaseConfigured()) {
    try {
      const { url, key } = getSupabaseConfig();
      let response = NextResponse.next({ request });
      const supabase = createServerClient(url, key, {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (items) => {
            items.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({ request });
            items.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          },
        },
      });
      const { data: { user } } = await supabase.auth.getUser();
      if (user) return response;
    } catch {
      // Supabase error or timeout
    }
  }

  // 4. Not authenticated: redirect any other /admin routes to /admin/login
  if (path.startsWith("/admin")) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next({ request });
}
