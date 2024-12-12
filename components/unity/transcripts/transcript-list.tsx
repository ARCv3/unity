"use client";

import { TableCell, TableRow } from "@/components/ui/table"
import { useBackend } from "@/hooks/use-backend"
import { useGlobalState } from "@/hooks/use-global-state";
import { DEFAULT_TRANSCRIPT_RESPONSE, DEFAULT_USER_RESPONSE, TranscriptsResponse, UserResponse } from "@/lib/definitions";
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
  
  const { actions } = useBackend();

  const [transcripts, setTranscripts] = useState([DEFAULT_TRANSCRIPT_RESPONSE])

  const { guild } = useGlobalState();
  
  useEffect(() => {

    actions.fetchGuildTranscripts(guild.id).then( x => {
      setTranscripts(x);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guild.id]);

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

    <TableRow>
      <TableCell className="font-medium">{transcript.modmailId}</TableCell>
      <TableCell>{transcript.transcripttype}</TableCell>
      <TableCell className="">{new Date(transcript.date).toUTCString()} ({timeAgo(new Date(transcript.date).getTime())})</TableCell>
      <TableCell>
        <HoverCard openDelay={1}>
          <HoverCardTrigger>
            <div className="flex text-right justify-end align-items-center">
              <ParticipantIcons participants={
                transcript.participants.length > 1? 
                [transcript.participants[0],transcript.participants[1]] :
                [transcript.participants[0]]
              }/>
              <p className="text-right font-bold underline cursor-pointer">{transcript.participants.length}</p>
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
  const { actions } = useBackend();

  useEffect(() => {

    const users: UserResponse[] = [];

    participants.forEach( x => {
      actions.fetchUser(x).then( y => {
        users.push(y);
      })
    })

    setParticipantUsers(users);

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
  const { actions, utils } = useBackend();

  useEffect(() => {

    const users: UserResponse[] = [];

    participants.forEach( x => {
      actions.fetchUser(x).then( y => {
        users.push(y);
      })
    })

    setParticipantUsers(users);

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