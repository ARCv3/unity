import '../app/globals.css'

import type { Meta, StoryObj } from '@storybook/react';
import { ProfilePage } from "@/components/unity/profile/ProfilePage";
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/unity/unity-sidebar';
import { DEFAULT_GUILD_RESPONSE, DEFAULT_USER_RESPONSE } from '@/lib/definitions';

import { Separator } from "@/components/ui/separator"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

const meta = {
    title: 'ProfilePage',
    component: ProfilePage,
    decorators: [
        (Story) => (
          <SidebarProvider defaultOpen={true}>
            <AppSidebar cTeam={DEFAULT_GUILD_RESPONSE.id} />
              <SidebarInset>
              <main>
                <header className="flex h-16 shrink-0 items-center gap-2">
                  <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbPage>
                            Dashboard
                          </BreadcrumbPage>
                        </BreadcrumbItem>
                        {/* <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                        </BreadcrumbItem> */}
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full w-full">
                  <Story/>
                  {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
                </div>
              </main>

              </SidebarInset>
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
      test: true
    },
  } satisfies Meta<typeof ProfilePage>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;

  export const Filled: Story = {

  };