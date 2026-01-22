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
    // Check if there's a redirect parameter
    const redirectParam = req.nextUrl.searchParams.get("redirect");

    if (redirectParam) {
      // Determine if user is authorized for the redirect destination
      const roleMap = {
        "/admin": 1,
        "/junior": 2,
        "/contributor": 3,
        "/project/manager": 4,
      };

      let isAuthorized = true;
      for (const [prefix, requiredType] of Object.entries(roleMap)) {
        if (redirectParam.startsWith(prefix) && userType !== requiredType) {
          isAuthorized = false;
          break;
        }
      }

      // Redirect to original page if authorized, otherwise to dashboard
      if (isAuthorized) {
        return NextResponse.redirect(new URL(redirectParam, req.url));
      }
    }

    // Default dashboard redirects
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

  // --- If not logged in & not visiting an allowed public page ---
  const isAuthRoute = path.startsWith("/auth");
  if (!token && !isAuthRoute && !isPublicProjectPage) {
    const redirectUrl = new URL("/auth/login", req.url);
    const requestUrl = new URL(req.url);
    const fullRedirectPath = requestUrl.pathname + requestUrl.search;
    console.log("Middleware - Unauthenticated redirect:", fullRedirectPath);
    redirectUrl.searchParams.set("redirect", fullRedirectPath);
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
      const requestUrl = new URL(req.url);
      const fullRedirectPath = requestUrl.pathname + requestUrl.search;
      console.log(
        "Middleware - Unauthenticated Role Protection redirect:",
        fullRedirectPath
      );
      redirectUrl.searchParams.set("redirect", fullRedirectPath);
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

  // Add current full path to headers for server components/actions to see
  const requestHeaders = new Headers(req.headers);
  const requestUrl = new URL(req.url);
  const fullPath = requestUrl.pathname + requestUrl.search;
  requestHeaders.set("x-pathname", fullPath);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
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
