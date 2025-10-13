import { NextRequest, NextResponse } from "next/server";

const protectedRoutes: Record<string, string[]> = {
  "/api/articles": ["POST", "PUT", "DELETE"],
  "/api/user/profile": ["ALL"],
  "/api/comments": ["ALL"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;
  const token = request.cookies.get("jwtToken")?.value;

  const deniedAnswer = NextResponse.json({ message: "No Token Provided, Access Denied !" }, { status: 401 });

  for (const [route, methods] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route)) {
      const needsAuth = methods.includes("ALL") || methods.includes(method);

      if (needsAuth && !token) {
        return deniedAnswer;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/articles/:path*", "/api/user/profile/:path*", "/api/comments/:path*"],
};
