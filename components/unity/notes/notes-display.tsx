import { useBackend } from "@/hooks/use-backend"
import { Note } from "@/lib/definitions"
import { multiFetch } from "@/lib/utils";
import { useEffect, useState } from "react"
import UserNote from "./user-note";

interface NotesDisplayProps {
  users: string[],
  guildid: string
}


export function NotesDisplay( {
  users,
  guildid
} : NotesDisplayProps) {

  const { actions } = useBackend(false);
  const notesDefault : Note[] = []
  const [ notes, setNotes ] = useState(notesDefault)

  useEffect(() => {

    const getNotes = multiFetch<Note[], string>(users, (x) => {
      return actions.fetchNotes(guildid, x)
    })

    getNotes().then(x => {

      const items : Note[] = []
      x.forEach(y => {
        y.forEach(z => {
          items.push(z)
        })
      })

      setNotes(items);

    })
    
  }, [users, guildid])

  return <>

    {
      notes.map(x => {
        return <UserNote key={x._id} note={x} />
      })
    }

  </>

}