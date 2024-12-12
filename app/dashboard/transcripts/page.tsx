import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  import { Separator } from "@/components/ui/separator"
  import {
    SidebarTrigger,
  } from "@/components/ui/sidebar"

  import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { TranscriptList } from "@/components/unity/transcripts/transcript-list"
  
  
  export default function Page() {
    return (
      <main>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Transcripts</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Table>
            <TableCaption>A list of saved Transcripts</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Id</TableHead>
                <TableHead className="w-[50px]">Type</TableHead>
                <TableHead className="w-[150px]">Date</TableHead>
                <TableHead className="text-right w-[50px]">Participants</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TranscriptList/>
            </TableBody>
          </Table>
        </div>
      </main>
    )
  }
  