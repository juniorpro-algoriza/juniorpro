import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const path = req.nextUrl.pathname;

  // 1️⃣ Not logged in → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("auth/login", req.url));
  }

  // 2️⃣ Role-based route protection
  if (
    path.startsWith("/admin") ||
    path.startsWith("/junior") ||
    path.startsWith("/contributor") ||
    path.startsWith("/project")
  ) {
    try {
      const profileRes = await fetch(
        "https://juniorpro-001-site1.ntempurl.com/api/User/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!profileRes.ok)
        return NextResponse.redirect(new URL("auth/login", req.url));

      const profile = await profileRes.json();
      const userType = profile.userType;

      if (path.startsWith("/admin") && userType !== 1)
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      if (path.startsWith("/junior") && userType !== 2)
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      if (path.startsWith("/contributor") && userType !== 3)
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      if (path.startsWith("/project") && userType !== 4)
        return NextResponse.redirect(new URL("/unauthorized", req.url));
    } catch {
      return NextResponse.redirect(new URL("auth/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/junior/:path*",
    "/contributor/:path*",
    "/project/:path*",
  ],
};
