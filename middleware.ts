
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {

  const session = req.cookies.get("session");

  if (session) {
    return  NextResponse.next();
  }

  const base_uri : string = process.env.UNITY_BASE_URI?? "localhost:3000";
  const redirect = NextResponse.redirect(new URL('/login', req.url));

  redirect.cookies.set("src", req.url.split(base_uri)[1])

  return redirect;

}

export const config = {
  matcher: '/dashboard/:path*'
}
