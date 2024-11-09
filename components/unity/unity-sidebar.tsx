"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  // GalleryVerticalEnd,
  // AudioWaveform,
  // Command,
  Settings2,
  SquareTerminal,
} from "lucide-react"



// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar"

// import { NavMain } from "@/components/unity/nav-main"
// import { NavProjects } from "@/components/unity/nav-projects"
// import { NavSecondary } from "@/components/unity/nav-secondary"

import { NavUser } from "@/components/unity/nav-user"
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

import { DEFAULT_GUILD_RESP_STRIPPED, DEFAULT_GUILD_RESPONSE, Guild } from "@/lib/definitions"
import { useBackend } from "@/hooks/use-backend"

const item1 : Guild = {
  _id: 'id',
  guildsnowflake: '707260999496892436',
  premium: true,
  moderators: [
    'id2'
  ],
  ownerid: 'owner'
}

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    item1
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  const [guilds, setGuilds] = React.useState([DEFAULT_GUILD_RESP_STRIPPED])
  
  const { consts, hooks, actions, utils } = useBackend();

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
        <TeamSwitcher test={false} teams={guilds}/>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={consts.me} />
      </SidebarFooter>
    </Sidebar>
  )
}
