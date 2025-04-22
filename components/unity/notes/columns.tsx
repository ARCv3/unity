"use client"

import { DEFAULT_USER_RESPONSE } from "@/lib/definitions";
import { timeAgo } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table"
import UserColumn from "./user-column";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";


export type UserNotesTableData = {
  userid: string;
  username: string;
  notes: number;
  lastNote: number;
}

export const UserNotesTestData : UserNotesTableData[] = [
  {
    userid: DEFAULT_USER_RESPONSE.id,
    username: DEFAULT_USER_RESPONSE.username,
    notes: 4,
    lastNote: new Date().getTime() - 394493
  },

  {
    userid: DEFAULT_USER_RESPONSE.id,
    username: DEFAULT_USER_RESPONSE.username,
    notes: 4,
    lastNote: new Date().getTime() - 2000
  },

  {
    userid: DEFAULT_USER_RESPONSE.id,
    username: DEFAULT_USER_RESPONSE.username,
    notes: 4,
    lastNote: new Date().getTime() - 19983944539
  },

  {
    userid: DEFAULT_USER_RESPONSE.id,
    username: DEFAULT_USER_RESPONSE.username,
    notes: 4,
    lastNote: new Date().getTime() - 240000000
  }
]

export const UserNotesTableColumns: ColumnDef<UserNotesTableData>[] = [
  {
    accessorKey: "username"
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
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
    header: ({column, table}) => {
      const uname = table.getColumn("username")??column;
      return (
        <div className="text-left">
          <Button
            variant="ghost"
            onClick={() => uname.toggleSorting(uname.getIsSorted() === "asc")}
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

        <UserColumn userid={`${userSnowflake}`}/>

      </>)
    }
  },  

  {
    accessorKey: "lastNote",
    header: ({column}) => <>
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc", true)}
        >
          Updated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>,
    cell: ({row}) => {

      const time = parseInt(row.getValue("lastNote"))
      return (
        <div className="text-right">
          {timeAgo(time)}
        </div>
      )
    }
  },

  {
    accessorKey: "notes",
    header: "Notes",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const tableData = row.original;

      return (
        <div className="text-right justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-10 bg-background border-solid border-muted border-2 rounded-lg p-0.5" align="end">
              <DropdownMenuLabel className="font-bold p-2 text-left">Actions</DropdownMenuLabel>
              <DropdownMenuItem className="hover:bg-muted p-2 m-0.5 hover:cursor-pointer rounded"
                onClick={() => navigator.clipboard.writeText(tableData.userid)}
              >
                Copy User ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem className="hover:bg-muted p-2 hover:cursor-pointer">View customer</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-muted p-2 hover:cursor-pointer">View payment details</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      )
    }
  }

]

