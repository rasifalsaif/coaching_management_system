import { betterMiddleware } from "better-auth/next-js";
import { NextResponse } from "next/server";

export default betterMiddleware(async (session, request) => {
  const { pathname } = request.nextUrl;

  // 1. If no session and trying to access protected routes, redirect to login
  if (!session) {
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // 2. If logged in and trying to access auth pages, redirect to their dashboard
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 3. Role-Based Redirections for "/dashboard" root
  if (pathname === "/dashboard") {
    const role = session.user.role?.toLowerCase();
    if (role) {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }
  }

  // 4. Granular Route Protection
  // Only ADMIN and MANAGER can access /dashboard/admin
  if (pathname.startsWith("/dashboard/admin") && !["ADMIN", "MANAGER"].includes(session.user.role)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Only TEACHER can access /dashboard/teacher
  if (pathname.startsWith("/dashboard/teacher") && session.user.role !== "TEACHER" && session.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Only STUDENT can access /dashboard/student
  if (pathname.startsWith("/dashboard/student") && session.user.role !== "STUDENT" && session.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};
