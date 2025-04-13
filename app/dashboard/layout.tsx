import { AppSidebar } from "@/components/unity/unity-sidebar"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { cookies } from "next/headers";


export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar-state")?.value === "true"
  const cTeam = cookieStore.get("sidebar-guild")?.value;

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar cTeam={cTeam} />
        <SidebarInset>
            {children}
        </SidebarInset>
    </SidebarProvider>
  );
}