import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_TITLE, SITE_DESCRIPTION_META } from "@/lib/definitions";

import { cookies } from "next/headers";
import {Auth} from "@/components/auth";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION_META,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value?? "";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark antialiased w-full h-full`}
      >
        <Auth token={token} />
        {children}
      </body>
    </html>
  );
}