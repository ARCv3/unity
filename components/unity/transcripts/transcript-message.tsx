"use client"

import { useBackend } from "@/hooks/use-backend"
import { DEFAULT_USER_RESPONSE, Transcript } from "@/lib/definitions";
import { useEffect, useState } from "react";

export function TranscriptMessage({
  transcript,
  key,
  showuser
}: {
  transcript: Transcript,
  key: number,
  showuser: boolean
}) {

  const { utils, actions } = useBackend(false);
  const [user, setUser] = useState(DEFAULT_USER_RESPONSE)

  useEffect(() => {

    actions.fetchUser(transcript.sendersnowflake).then(x => {
      setUser(x)
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript.sendersnowflake])

  const date = new Date(transcript.createdat)
  const formattedDate = date.toLocaleString('en-CA')

  return (
    <>
          {showuser &&
              <div id={`${key}`} className="chatlog__message-group">
              <div className="chatlog__message-container">
                <div className="chatlog__message hover:bg-muted/50 rounded">
                  <div className="chatlog__message-aside">
                    <img style={{opacity: transcript.comment ? "40%" : "100%"}} className="chatlog__avatar"
                         src={utils.getUserIconUrl(user)}
                         alt="Avatar" loading="lazy"/>
                  </div>
                  <div className="chatlog__message-primary">
                    <div className="chatlog__header">
                      <span className="chatlog__author" style={{opacity: transcript.comment ? "40%" : "100%"}}
                            title={user.username} data-user-id={transcript.sendersnowflake}>{user.username}</span>
                      <span className="chatlog__timestamp"><a style={{opacity: transcript.comment ? "50%" : "100%"}}
                                                              href={`#${key}`}>{formattedDate} {`${transcript.comment ? "Comment" : ""}`}</a></span>
                    </div>
                    <div className='chatlog__content chatlog__markdown'>
                      <span style={{opacity: transcript.comment ? "50%" : "100%"}}
                            className="chatlog__markdown-preserve">{transcript.comment ? transcript.messagecontent.split("# ")[1] : transcript.messagecontent}</span>
                    </div>
                  </div>
                </div>
              </div>
              </div>
          }

        {
            !showuser && <>
                <div className="chatlog__message hover:bg-muted/50">
                  <div className="chatlog__message-aside under">
                  </div>
                  <div className="chatlog__message-primary under  ">
                    <div className='chatlog__content chatlog__markdown'>
                      <span style={{opacity: transcript.comment ? "50%" : "100%"}}
                            className="chatlog__markdown-preserve">{transcript.comment ? transcript.messagecontent.split("# ")[1] : transcript.messagecontent}</span>
                    </div>
                  </div>
                </div>
              </>
          }


    </>
  )
}