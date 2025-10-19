import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const userType = Number(req.cookies.get("user_type")?.value || 0);
  const path = req.nextUrl.pathname;

  // Allow public project pages like /project/[id]
  const isPublicProjectPage =
    path.startsWith("/project/") &&
    !path.startsWith("/project/manager") &&
    !path.endsWith("/dashboard");

  // --- If user tries to access /auth while already logged in ---
  if (
    (path.startsWith("/auth/login") || path.startsWith("/auth/sign-up")) &&
    token
  ) {
    switch (userType) {
      case 1:
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      case 2:
        return NextResponse.redirect(new URL("/junior/dashboard", req.url));
      case 3:
        return NextResponse.redirect(new URL("/contributor/dashboard", req.url));
      case 4:
        return NextResponse.redirect(new URL("/project/manager/dashboard", req.url));
      default:
        return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // --- If not logged in & not visiting an allowed public page ---
  const isAuthRoute = path.startsWith("/auth");
  if (!token && !isAuthRoute && !isPublicProjectPage) {
    const redirectUrl = new URL("/auth/login", req.url);
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // --- Role-based route protection ---
  if (
    path.startsWith("/admin") ||
    path.startsWith("/junior") ||
    path.startsWith("/contributor") ||
    path.startsWith("/project/manager")
  ) {
    if (!token) {
      const redirectUrl = new URL("/auth/login", req.url);
      redirectUrl.searchParams.set("redirect", req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Role authorization check
    const roleMap = {
      "/admin": 1,
      "/junior": 2,
      "/contributor": 3,
      "/project/manager": 4,
    };

    for (const [prefix, type] of Object.entries(roleMap)) {
      if (path.startsWith(prefix) && userType !== type) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/admin/:path*",
    "/junior/:path*",
    "/contributor/:path*",
    "/project/manager/:path*",
  ],
};
