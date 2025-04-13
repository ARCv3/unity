"use client"
import { useBackend } from "@/hooks/use-backend";
import { useEffect, useState } from "react";
import { useSelectedGuildState } from "@/hooks/use-selected-guild-state";
import { transformNotesResponse, UserResponse } from "@/lib/definitions";
import { UserNotesTableColumns, UserNotesTableData } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { NotesDisplay } from "./notes-display";

export default function UserNotes() {
 
  const { actions } = useBackend(false);
  const notes : UserNotesTableData[] = [];
  const [notedata, setnoteData] = useState(notes);
  const { guild } = useSelectedGuildState();

  const usersList : string[] = []
  const [selectedUsers, setSelectedUsers] = useState(usersList)

  useEffect(() => {

    actions.fetchAllGuildNotes(guild.id).then(x => {

      const noteDatas : UserNotesTableData[] = [];
      const notes = transformNotesResponse(x);
      
      const getUsers = async () => {

        const usersPromises : Promise<UserResponse>[] = [];

        notes.forEach(data => {
          usersPromises.push(actions.fetchUser(data.userSnowflake));
        })
  
        return Promise.all(usersPromises);
  
      }

      getUsers().then(users => {

        users.forEach(user => {

          const tableData : UserNotesTableData= {
            userid: user.id,
            username: user.username,
            notes: notes.filter(x=>x.userSnowflake == user.id)[0].noteCount(),
            lastNote: parseInt(notes.filter(x=>x.userSnowflake == user.id)[0].getLatestNote().date) * 1000
          }

          noteDatas.push(tableData);

        })
          
        setnoteData(noteDatas)

      })

    })

  }, [guild.id])


  return (
    <div>
      <div className="container mx-auto">
        <DataTable onRowSelectionChange={(x) => {
          setSelectedUsers(x);
        }} columns={UserNotesTableColumns} data={notedata}/>
      </div>
      <div className="container mx-auto">
        <NotesDisplay users={selectedUsers} guildid={guild.id}/>
      </div>
    </div>
  )

}