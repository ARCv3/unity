"use client"

import * as React from "react"

// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar"

// import { NavMain } from "@/components/unity/nav-main"
// import { NavProjects } from "@/components/unity/nav-projects"
// import { NavSecondary } from "@/components/unity/nav-secondary"

import { NavUser } from "@/components/unity/nav-user"

import { NavMain } from "./nav-main"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  // SidebarMenu,
  // SidebarMenuButton,
  // SidebarMenuItem,
} from "@/components/ui/sidebar"

import { TeamSwitcher } from "./team-switcher"

import { GuildResponseStripped } from "@/lib/definitions"
import { useBackend } from "@/hooks/use-backend"
import { ChartNoAxesCombined, Home, ScrollText, Settings, SquareUserRound, UserRoundPen } from "lucide-react"

const UNITY_SIDEBAR_LAYOUT = {
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
      items: [

      ]

    },
    {
      title: "Insights",
      url: "/dashboard/insights",
      icon: ChartNoAxesCombined,
      items: [

      ],
    },
    {
      title: "Transcripts",
      url: "/dashboard/transcripts",
      icon: ScrollText,
      items: [

      ],
    },
    {
      title: "Applications",
      url: "/dashboard/applications",
      icon: SquareUserRound,
      items: [

      ],
    },
    {
      title: "User Notes",
      url: "/dashboard/notes",
      icon: UserRoundPen,
      items: [

      ],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      items: [

      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  const default_guilds : GuildResponseStripped[] = [];
  const [guilds, setGuilds] = React.useState(default_guilds)

  const { consts, actions} = useBackend();

  React.useEffect(() => {
    if (consts.me && consts.token) {
    
      actions.fetchMyGuilds().then(x => {
        setGuilds(x);
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consts.token])
  
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <TeamSwitcher cTeam={props.cTeam?? null} test={false} teams={guilds}/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={UNITY_SIDEBAR_LAYOUT.navMain} />
        {/*<NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={consts.me} />
      </SidebarFooter>
    </Sidebar>
  )
}
