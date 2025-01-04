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
import { useCallback } from "react"
import { useGlobalState } from "@/hooks/use-global-state"
import { EMPTY_GUILD_RESPONSE } from "@/lib/definitions"


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

  const { guild } = useGlobalState();

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
      
          }} isCurrentDefault={true}/>)
        }
        {
        guild !== EMPTY_GUILD_RESPONSE && 
        items.map((item) => (
          <NavMainItem item={item} isCurrentDefault={false} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

function NavMainItem({item, isCurrentDefault} : {
  item: navMainItemSchema,
  isCurrentDefault: boolean
}) {

  const isCurrent = useCallback((item : navMainItemSchema) : boolean => {
    if (typeof window !== 'undefined')
      return window.location.pathname == item.url;
    return isCurrentDefault;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
  <SidebarMenuItem>
    <SidebarMenuButton style={isCurrent(item)? {backgroundColor: "hsl(var(--sidebar-accent))"} :  {}} asChild tooltip={item.title}>
      <a href={item.url}>
        <item.icon />
        <span>{item.title}</span>
      </a>
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
                  <a href={subItem.url}>
                    <span>{subItem.title}</span>
                  </a>
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
