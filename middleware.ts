import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/utils/authentication";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/register", "/mood", "/session"];

const middleware = async (req: NextRequest) => {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get("session")?.value;
  const sessionValues = await decrypt(cookie);

  // 5. Redirect to /login if the user is not authenticated
  if (
    isProtectedRoute &&
    (!sessionValues?.userName ||
      !sessionValues?.mood ||
      !sessionValues?.session)
  ) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    sessionValues?.name &&
    sessionValues?.mood &&
    sessionValues?.session &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
};

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

export default middleware;
