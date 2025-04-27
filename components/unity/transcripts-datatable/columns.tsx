import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { timeAgo } from "@/lib/utils";


export type TranscriptsTableData = {
    type: string;
    id: string;
    date: number;
}

export const TranscriptsTableColuns: ColumnDef<TranscriptsTableData>[] = [

    {
        accessorKey: "id",
        header: "ID"
    },

    {
        accessorKey: "type",
        header: ({column}) => <>

            <Button
                variant="ghost"
                onClick={() => {
                    const value = column.getFilterValue();
            

                    switch (value) {
                        case "Jail": 
                            column.setFilterValue("Modmail")
                            break;
                        case "Modmail":
                            column.setFilterValue(undefined)
                            break;
                        case undefined:
                            column.setFilterValue("Jail")
                            break;
                    }

                }}>
                Type
            </Button>

        </>,
    },  
 
    {
        accessorKey: "date",
        header: ({column}) => <>

            <div className="text-right">

                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc", true)}>
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>

            </div>
        
        </>,
        cell: ({row}) => {
            const time = parseInt(row.getValue("date"));
            return (
                <div className="text-right">
                    {timeAgo(time)}
                </div>
            )
        }
    }
]