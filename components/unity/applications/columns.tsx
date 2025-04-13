"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DEFAULT_APPLICATION, DEFAULT_APPROVAL, DEFAULT_USER_RESPONSE } from "@/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import UserColumn from "../notes/user-column";
import { Approval } from "@/lib/definitions";
import { ParticipantIcons, Participants } from "../transcripts/transcript-list";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";

export type ApplicationsTableData = {
    userid: string;
    username: string;
    approvals: Approval[];
}

export const ApplicationsTestData : ApplicationsTableData[] = [
    {
        userid: DEFAULT_USER_RESPONSE.id,
        username: DEFAULT_USER_RESPONSE.username,
        approvals: [DEFAULT_APPROVAL]
    },
    {
        userid: DEFAULT_APPLICATION.userSnowflake,
        username: "Pomby",
        approvals: [DEFAULT_APPROVAL]
    }
    
]

export const ApplicationsTableColumns: ColumnDef<ApplicationsTableData>[] = [
    {
        accessorKey: "username"
    },
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
            checked={
                table.getIsAllPageRowsSelected() || 
                (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select All"
            />
        ),
        cell: ({row}) => (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row" 
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "userid",
        header: ({ column, table }) => {
            const uname = table.getColumn("username")?? column;
            return (
                <div className="text-left">
                    <Button
                      variant="ghost"
                      onClick={() => uname.toggleSorting(uname.getIsSorted() == "asc")}
                      >
                        User
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({row}) => {
            const userSnowflake = row.getValue("userid");
            return (<>

                <UserColumn userid={`${userSnowflake}`} />

            </>)
        }
    },
    {
        accessorKey: "approvals",
        header: () => {
           return <p className="text-right">Approvals</p>
        },
        cell: ({row}) => {
            const approvals : Approval[] = row.getValue('approvals');
            const approvalParticipants: string[] = approvals.map(x => x.authorSnowflake);
            return <HoverCard>
                <HoverCardTrigger>
                    <div className="flex text-right justify-end align-items-center">
                        {
                            approvalParticipants.length > 0 &&
                            <ParticipantIcons participants={
                                approvalParticipants.length > 1 ? 
                                [approvalParticipants[0], approvalParticipants[1]] : 
                                [approvalParticipants[0]]
                            }/>
                        }
                        <p className="text-right font-bold underline">{approvalParticipants.length}</p>
                    </div>
                </HoverCardTrigger>
                <HoverCardContent>
                    <div className="opacity-100 z-50 bg-muted  p-2 rounded border">
                        <p className="text-base mb-3">{approvalParticipants.length} Approvals</p>
                        <Participants participants={approvalParticipants}  />
                    </div>
                </HoverCardContent>
            </HoverCard>
       
        }
    },
]