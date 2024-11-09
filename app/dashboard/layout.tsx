import type { Metadata } from "next";
import "../globals.css";

import { AppSidebar } from "@/components/unity/unity-sidebar"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export const metadata: Metadata = {
  title: "Unity Dashboard",
  description: "unity frontend for arcv3",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            {children}
        </SidebarInset>
    </SidebarProvider>
  );
}