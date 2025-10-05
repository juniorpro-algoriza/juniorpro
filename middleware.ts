import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const userType = Number(req.cookies.get("user_type")?.value || 0);
  const path = req.nextUrl.pathname;

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
        return NextResponse.redirect(
          new URL("/contributor/dashboard", req.url)
        );
      case 4:
        return NextResponse.redirect(
          new URL("/project/manager/dashboard", req.url)
        );
      default:
        return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Not logged in → redirect to login
  if (!token && !path.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Role-based route protection
  if (
    path.startsWith("/admin") ||
    path.startsWith("/junior") ||
    path.startsWith("/contributor") ||
    path.startsWith("/project")
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (
      (path.startsWith("/admin") && userType !== 1) ||
      (path.startsWith("/junior") && userType !== 2) ||
      (path.startsWith("/contributor") && userType !== 3) ||
      (path.startsWith("/project") && userType !== 4)
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
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
    "/project/:path*",
  ],
};
