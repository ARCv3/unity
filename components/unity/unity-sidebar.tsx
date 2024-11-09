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
import { BookOpen, Bot, ChartNoAxesCombined, Home, ScrollText, Settings, Settings2, SquareTerminal, SquareUserRound, UserRoundPen } from "lucide-react"
import { title } from "process"

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
      url: "#",
      icon: ScrollText,
      items: [

      ],
    },
    {
      title: "Applications",
      url: "#",
      icon: SquareUserRound,
      items: [

      ],
    },
    {
      title: "User Notes",
      url: "#",
      icon: UserRoundPen,
      items: [

      ],
    },
    {
      title: "Settings",
      url: "#",
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
    if (consts.me) {
      actions.fetchMyGuilds().then(x => {
        setGuilds(x);
      })
    }
  }, [consts.me])
  
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
