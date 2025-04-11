
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {

  const session = req.cookies.get("session");

  let token = undefined;

  if (session && session.value !== '') {
    token = session.value;
  }

  if (req.nextUrl.pathname == '/login' && token) {
    const redirect = NextResponse.redirect(new URL('/dashboard', req.url));
    return redirect;
  }

  if (req.nextUrl.pathname.startsWith('/dashboard') && !token) {
    const redirect = NextResponse.redirect(new URL('/login', req.url));
    return redirect;
  }

  return NextResponse.next();

}

export const config = {
  matcher: '/:path*'
}
