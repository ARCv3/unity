
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {

  const session = req.cookies.get("session");
  const src = req.cookies.get("unity-src");

  let token = undefined;

  if (session && session.value !== '') {
    token = session.value;
  }

  if (req.nextUrl.pathname == '/login' && token) {

    if (src && src.value !== '') {
      const unitySrc = src.value;
      req.cookies.delete('unity-src');
      const redirect = NextResponse.redirect(new URL(unitySrc, req.url));
      return redirect;
    }

    const redirect = NextResponse.redirect(new URL('/dashboard', req.url));
    return redirect;
  }

  if (req.nextUrl.pathname.startsWith('/dashboard') && !token) {
    
    req.cookies.set(
      'unity-src',
      req.nextUrl.pathname,
    );

    const redirect = NextResponse.redirect(new URL('/login', req.url));
    return redirect;
  }

  return NextResponse.next();

}

export const config = {
  matcher: '/:path*'
}
