"use client"

import { ChevronRight, Home, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useSelectedGuildState } from "@/hooks/use-selected-guild-state"
import { EMPTY_GUILD_RESPONSE } from "@/lib/definitions"
import { useRedirects } from "@/hooks/use-redirects"


export type navMainItemSchema = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}
export function NavMain({
  items,
}: {
  items: navMainItemSchema[]
}) {

  const { guild } = useSelectedGuildState();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {
          guild === EMPTY_GUILD_RESPONSE && 
          (<NavMainItem item={    {
            title: "Home",
            url: "/dashboard",
            icon: Home,
            items: [
      
            ]
      
          }} />)
        }
        {
        guild !== EMPTY_GUILD_RESPONSE && 
        items.map((item) => (
          <NavMainItem key={item.url} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

function NavMainItem({item} : {
  item: navMainItemSchema
}) {


  const { redirect } = useRedirects();

  return <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
  <SidebarMenuItem>
    <SidebarMenuButton asChild tooltip={item.title}>
      <div onClick={() => redirect(item.url)}>
        <item.icon />
        <span>{item.title}</span>
      </div>
    </SidebarMenuButton>
    {item.items?.length ? (
      <>
        <CollapsibleTrigger asChild>
          <SidebarMenuAction className="data-[state=open]:rotate-90">
            <ChevronRight />
            <span className="sr-only">Toggle</span>
          </SidebarMenuAction>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild>
                  <div onClick={() => redirect(subItem.url)}>
                    <span>{subItem.title}</span>
                  </div>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </>
    ) : null}
  </SidebarMenuItem>
</Collapsible>
}
