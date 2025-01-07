import { DEFAULT_USER_RESPONSE, Note } from "@/lib/definitions"
import { timeAgo } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useBackend } from "@/hooks/use-backend"
import { MemberLabel } from "@/components/ui/MemberLabel"

interface UserNoteProps {
  note: Note
}

export default function UserNote({
  note
} : UserNoteProps) {


  const [ user, setUser ] = useState(DEFAULT_USER_RESPONSE)
  const [ author, setAuthor ] = useState(DEFAULT_USER_RESPONSE)
  const { actions } = useBackend(false);

  useEffect(() => {
    actions.fetchUser(note.usersnowflake).then(x => {
      setUser(x);
    })
    actions.fetchUser(note.authorsnowflake).then(x => {
      setAuthor(x);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.usersnowflake, note.authorsnowflake])


  return <div className="border-muted w-[100%] min-h-20 border-2 rounded-xl my-5 p-5">

    <div className="flex flex-col *:my-2">
      <div className="flex align-items-center justify-between">
        <MemberLabel user={user} placement="right" />
        <p className="text-muted-foreground/50"><span className="text-muted">by</span> {author.username} <span className="text-muted">{timeAgo(parseInt(note.date)*1000)}</span></p>
      </div>  
      <p className="border-muted border-2 bg-muted/50 p-2 rounded">{note.note}</p>
    </div>


  </div>

}