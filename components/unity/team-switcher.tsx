"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {setCookie} from 'cookies-next'

import { EMPTY_GUILD_RESPONSE, GuildResponseStripped } from "@/lib/definitions"

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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useBackend } from "@/hooks/use-backend"
import { useSelectedGuildState } from "@/hooks/use-selected-guild-state"
import { useSearchParams } from "next/navigation"

const SIDEBAR_COOKIE_NAME = "sidebar-guild"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7

export function TeamSwitcher({
  teams,
  test = false,
  cTeam = null
}: {
  teams: GuildResponseStripped[];
  test: boolean;
  cTeam: string | null;
}) {

  const searchParams = useSearchParams();
  const paramGuild = searchParams.get("guild");

  const defaultOpen = paramGuild? {id: paramGuild} : 
    (cTeam? {id: cTeam} : EMPTY_GUILD_RESPONSE);

  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(defaultOpen)
  
  const { guild, setGuild } = useSelectedGuildState()

  const { hooks, actions, utils, consts} = useBackend(false)

  React.useEffect(() => {

    if (paramGuild)
      setCookie(SIDEBAR_COOKIE_NAME, paramGuild, {expires: new Date(Date.now() + SIDEBAR_COOKIE_MAX_AGE), path: "/"})
    
    hooks.setIsTest(test);
    
    if (activeTeam.id && consts.token)
        actions.fetchGuild(activeTeam.id).then( (data) => {
            setGuild(data)
        });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTeam, consts.token])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={utils.getIconUrl(guild)} alt={guild.name} />
                    <AvatarFallback className="rounded-lg">?</AvatarFallback>
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {guild.name}
                </span>
                <span className="truncate text-xs">{(guild.data?guild.data.premium:false)? 'Premium' : 'Free'}</span>
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
            {teams.map((team) => (
              <DropdownMenuItem
                key={team.id}
                onClick={() => {
                    setCookie(SIDEBAR_COOKIE_NAME, team.id, {expires: new Date(Date.now() + SIDEBAR_COOKIE_MAX_AGE), path: "/"})
                    setActiveTeam(team)
                    window.location.href = '/dashboard'
                }}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={utils.getIconUrl(team)} alt={team.name} />
                    <AvatarFallback className="rounded-lg">?</AvatarFallback>
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
