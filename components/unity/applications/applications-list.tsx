"use client"

import { DataTable } from "@/components/ui/data-table";
import { useBackend } from "@/hooks/use-backend";

import { useSelectedGuildState } from "@/hooks/use-selected-guild-state";
import { Application, EMPTY_GUILD_RESPONSE, UserResponse } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { ApplicationsTableColumns, ApplicationsTableData } from "./columns";
import ApplicationsDisplay from "./application-display";


export function ApplicationsList({
     
}) {


    const emptyAppList : Application[] = []
    const { actions, consts } = useBackend();
    const { guild } = useSelectedGuildState();

    const [applications, setApplications] = useState(emptyAppList);
    const defaultApplicatonsData : ApplicationsTableData[] = [];
    const [applicationsData, setApplicationsData] = useState(defaultApplicatonsData);

    const userList: string[] = []
    const [selectedUsers, setSelectedUsers] = useState(userList)

    useEffect(() => {

        const appDatas : ApplicationsTableData[] = [];

        if (consts.token && guild !== EMPTY_GUILD_RESPONSE) {
            
            actions.fetchGuildApplications(guild.id).then(x => {
                const guildApplications = x;
                setApplications(x)

                const getUsers = async () => {
                    const userPromises: Promise<UserResponse>[] = [];
                    guildApplications.forEach(data => {
                        userPromises.push(actions.fetchUser(data.userSnowflake));
                    })

                    return Promise.all(userPromises);
                }

                actions.fetchGuildApplicationApproals(guild.id).then(x => {

                    getUsers().then(users => {
                        users.forEach(user => {

                            const tableData : ApplicationsTableData = {
                                userid: user.id,
                                username: user.username,

                                approvals: x.filter(y=>y.userSnowflake == user.id)
                            }

                            appDatas.push(tableData);

                        })
                        setApplicationsData(appDatas);
                    })

                })
            })
    

        }
 

    }, [consts.token, guild])

    return (
        <div className="flex max-md:flex-col rounded-lg m-4">
            <div className="container mx-auto p-4 pt-0 flex-3">
                <DataTable onRowSelectionChange={(x) => {
                    setSelectedUsers(x);
                }}
                onTableRowClick={(row) => {
                    row.toggleSelected();
                }}
                multipleSelection={false}
                columns={ApplicationsTableColumns}
                data={applicationsData}/>
            </div>
            <div className="container mx-auto p-4 flex-4">
                
                {
   
                    applications.filter(x => x.userSnowflake === selectedUsers[0])[0] && 
                    <ApplicationsDisplay application={applications.filter(x => x.userSnowflake === selectedUsers[0])[0]}/>
                }

            </div>
        </div>
    );
}