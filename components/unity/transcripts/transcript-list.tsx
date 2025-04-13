"use client";

import { TableCell, TableRow } from "@/components/ui/table"
import { useBackend } from "@/hooks/use-backend"
import { useSelectedGuildState } from "@/hooks/use-selected-guild-state";
import { DEFAULT_USER_RESPONSE, EMPTY_GUILD_RESPONSE, TranscriptsResponse, UserResponse } from "@/lib/definitions";
import { timeAgo } from "@/lib/utils";
import { useEffect, useState } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { MemberLabel } from "@/components/ui/MemberLabel";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";


export function TranscriptList() {
  
  const { actions, consts } = useBackend(false);

  const default_transcript_list : TranscriptsResponse[] = []

  const [transcripts, setTranscripts] = useState(default_transcript_list)

  const { guild } = useSelectedGuildState();
  
  useEffect(() => {

    if (consts.token && guild !== EMPTY_GUILD_RESPONSE)
      actions.fetchGuildTranscripts(guild.id).then( x => {
        setTranscripts(x);
      }).catch(() => {

        setTranscripts([])
      })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guild.id, consts.token]);

  return <>
    {transcripts.map(x => <TranscriptRow key={x.modmailId} transcript={x}/>)}
  </>

}

export function TranscriptRow(
  {
    transcript
  } : {
    transcript: TranscriptsResponse
  }
) {

  return (

    <TableRow className="cursor-pointer" onClick={() => {
      window.location.href = `/dashboard/transcripts/${transcript.modmailId}`;
    }}>
      <TableCell className="font-medium">{transcript.modmailId}</TableCell>
      <TableCell>{transcript.transcripttype}</TableCell>
      <TableCell className="">{new Date(transcript.date).toUTCString()} ({timeAgo(new Date(transcript.date).getTime())})</TableCell>
      <TableCell>
        <HoverCard openDelay={1} closeDelay={1}>
          <HoverCardTrigger>
            <div className="flex text-right justify-end align-items-center">
              {
                transcript.participants.length > 0 && 
                <ParticipantIcons participants={
                  transcript.participants.length > 1? 
                  [transcript.participants[0],transcript.participants[1]] :
                  [transcript.participants[0]]
                }/>
              }

              <p className="text-right font-bold underline">{transcript.participants.length}</p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="text-base mb-3">All participants in this {transcript.transcripttype}:</p>
            <Participants participants={transcript.participants} />
          </HoverCardContent>
        </HoverCard>
      </TableCell>
    </TableRow>

  )

}

export function Participants({
  participants
}: {
  participants: string[]
}) {

  const [participantUsers, setParticipantUsers] = useState([DEFAULT_USER_RESPONSE])
  const { actions } = useBackend(false);

  useEffect(() => {


    const getUsers = async () => {
      
      const  usersPromises: Promise<UserResponse>[] = [];

      participants.forEach( x => {

        usersPromises.push(
          actions.fetchUser(x)
        )

      })

      return  Promise.all(usersPromises)
    }

    getUsers().then((x) => {

      setParticipantUsers(x);
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participants])

  return (<>

    { participantUsers.map( x => {
      return <div key={x.id} className="pb-2 mb-2 border-b-2 border-opacity-5 border-black dark:border-slate-700">
          <MemberLabel user={x} placement="right" />
        </div>
    })}

  </>)

}

export function ParticipantIcons({
  participants
}: {
  participants: string[]
}) {

  const [participantUsers, setParticipantUsers] = useState([DEFAULT_USER_RESPONSE])
  const { actions, utils } = useBackend(false);

  useEffect(() => {

    const getUsers = async () => {
      
      const  usersPromises: Promise<UserResponse>[] = [];

      participants.forEach( x => {

        usersPromises.push(
          actions.fetchUser(x)
        )

      })

      return  Promise.all(usersPromises)
    }

    getUsers().then((x) => {

      setParticipantUsers(x);
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participants])


  return (<div className="flex">

    { participantUsers.map( x => {
      return (
          <Avatar key={x.id} className="h-8 w-8 mr-2 ">
            <AvatarImage className="rounded-lg" src={utils.getUserIconUrl(x)} alt={x.username} />
            <AvatarFallback className="rounded-lg">?</AvatarFallback>
          </Avatar>
          )
    })}

  </div>)

}