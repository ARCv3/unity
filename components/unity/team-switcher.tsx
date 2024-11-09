"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import { DEFAULT_GUILD_RESPONSE, Guild, GuildResponseStripped } from "@/lib/definitions"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useBackend } from "@/hooks/use-backend"

export function TeamSwitcher({
  teams,
  test = false
}: {
  teams: GuildResponseStripped[]
  test: boolean;
}) {

  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])
  const [guildData, setGuildData] = React.useState(DEFAULT_GUILD_RESPONSE)

  const { hooks, actions, utils} = useBackend()

  React.useEffect(() => {

    hooks.setIsTest(test);
    
    actions.fetchGuild(activeTeam.id).then( (data) => {
        setGuildData(data)
    });

  }, [activeTeam])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={utils.getIconUrl(guildData)} alt={guildData.name} />
                    <AvatarFallback className="rounded-lg">GU</AvatarFallback>
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {guildData.name}
                </span>
                <span className="truncate text-xs">{guildData.data.premium? 'Premium' : 'Free'}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.id}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={utils.getIconUrl(team)} alt={team.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                </div>
                {team.name}
                {/* <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add Guild</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
