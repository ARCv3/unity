"use client"

import { useBackend } from "@/hooks/use-backend"
import { useGlobalState } from "@/hooks/use-global-state";
import { Transcripts } from "@/lib/definitions";
import { useCallback, useEffect, useState } from "react";
import { TranscriptMessage } from "./transcript-message";
import Image from "next/image";

export function TranscriptView({
  id
}: {
  id: string
}) {

  const default_messages : Transcripts = new Transcripts([]);

  const { utils, actions } = useBackend(false);
  const { guild } = useGlobalState();
  
  const [messages, setMessages] = useState(default_messages)

  useEffect(() => {
    
    if (guild.id !== "") {
      actions.fetchTranscriptMessagesGuildId(guild.id, id).then(x => {
        setMessages(x)
      })
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guild.id, id])


  const renderMessages = useCallback(() => {

      if (!messages.messages)
          return

      let prevmail = {sendersnowflake:""}

      return messages.messages.map((x, i) => {
          const showuser = x.sendersnowflake !== prevmail.sendersnowflake
          prevmail = x;
          return <>
            <TranscriptMessage showuser={showuser} key={i} transcript={x} />
          </>
      })

  }, [messages.messages])


  return (
    <section>
      <div className="preamble">
                
        <div className="preamble__guild-icon-container">
          <Image className="preamble__guild-icon" src={utils.getIconUrl(guild)} alt=' Guild icon' loading="lazy"/>
        </div>

        <div className="preamble__entries-container">
          <div className="preamble__entry">{guild.name}</div>
          {/* <div className="preamble__entry"><button className="button" onClick={toggleSidebar}>Transcripts</button></div> */}
          <div className="preamble__entry">{id}</div>
        </div>

      </div>

      <div className="amble">{renderMessages()}</div>

      <div className="postamble">
        <div className="postamble__entry">Saved {messages.messageCount()} message(s)</div>
      </div>

    </section>
  )
}