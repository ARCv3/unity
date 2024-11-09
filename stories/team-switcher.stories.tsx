import { TeamSwitcher } from "@/components/unity/team-switcher";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";

import '../app/globals.css'

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Home } from "lucide-react";
import { DEFAULT_GUILD_RESP_STRIPPED, Guild, GuildResponseStripped } from "@/lib/definitions";

const guilds : [GuildResponseStripped] = [
    DEFAULT_GUILD_RESP_STRIPPED
]

const meta = {
    title: 'Team Switcher',
    component: TeamSwitcher,
    decorators: [
        (Story) => (
            <SidebarProvider>
                <Sidebar>
                    <Story/>
                </Sidebar>
            </SidebarProvider>
        ),
    ],
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
      // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
      layout: 'fullscreen',
    },
    args: {
        teams: guilds,
        test: true,
        cTeam: null,    
    },
  } satisfies Meta<typeof TeamSwitcher>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;

  export const TeamSwitch: Story = {

  };