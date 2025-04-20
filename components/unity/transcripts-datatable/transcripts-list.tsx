"use client";

import { useBackend } from "@/hooks/use-backend";
import { useSelectedGuildState } from "@/hooks/use-selected-guild-state";
import { useEffect, useState } from "react";
import { TranscriptsTableColuns, TranscriptsTableData } from "./columns";
import { EMPTY_GUILD_RESPONSE } from "@/lib/definitions";
import { DataTable } from "@/components/ui/data-table";
import { useRedirects } from "@/hooks/use-redirects";

export default function TranscriptsList() {

    const { actions, consts } = useBackend(false)
    const { guild } = useSelectedGuildState();
    const { redirectTranscript } = useRedirects();

    const default_transcript_list : TranscriptsTableData[] = [];
    const [transcripts, setTranscripts] = useState(default_transcript_list);

    useEffect(() => {

        if (consts.token && guild !== EMPTY_GUILD_RESPONSE) {
            actions.fetchGuildTranscripts(guild.id).then(x => {

                const transcriptDatas : TranscriptsTableData[] = []

                x.forEach(transcript => {

                    const data : TranscriptsTableData = {
                        id: transcript.modmailId,
                        type: transcript.transcripttype,
                        date: new Date(transcript.date).getTime()
                    }

                    transcriptDatas.push(data);

                });

                transcriptDatas.sort( (a, b) => {
                    return b.date - a.date
                })

                setTranscripts(transcriptDatas);

            })
        }


    }, [consts.token, guild])


    return (
        <>
        
            <DataTable 
                onTableRowClick={(row) => {
                    const id : string = row.getValue("id")
                    redirectTranscript(id);
                }}
                enableSearch={false}
                onRowSelectionChange={() => {

                }}
                multipleSelection = {false}
                columns={TranscriptsTableColuns}
                data={transcripts}
            />

        </>
    )
}