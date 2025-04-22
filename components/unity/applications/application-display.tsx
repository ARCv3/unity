"use client"

import { Application } from "@/lib/definitions"
import UserColumn from "../notes/user-column"
import { timeAgo } from "@/lib/utils"
import { ReactNode } from "react"

export interface ApplicationDisplayProps {
    application: Application,
    bottomValue?: ReactNode
}

export default function ApplicationsDisplay({
    application,
    bottomValue=null
}: ApplicationDisplayProps) {

    return (
        
        <div className="bg-muted/50 w-full h-full rounded-lg p-4">
            <div className="border-b  border-opacity-5 border-black dark:border-muted/100 pb-2 flex justify-between ">
                <UserColumn userid={application.userSnowflake}/>
                <p className="opacity-50">Submitted {timeAgo(parseInt(application.submitDate))}</p>
            </div>
            <div className="mt-2 p-5">
                <p  className="font-semibold">About this user:</p>
                <div className="border-b border-opacity-5 border-black dark:border-muted/100 pb-2">
                    <p className="opacity-50">{application.age} Years old</p>
                    <p className="opacity-50">Joined discord in {application.joindate}</p>
                </div>
                <p  className="font-semibold mt-2">Experience: </p>
                <div className="border-b border-opacity-5 border-black dark:border-muted/100 pb-2 ">
                    <div>
                        <p className="opacity-50 inline">Moderation Experience: </p>
                        <span>{application.experience}</span>
                    </div>
                    <div>
                        <p className="opacity-50 inline">Bot experience: </p>
                        <span>{application.botexp}</span>
                    </div>
                    <div>
                        <p className="opacity-50 inline">Experience in: </p>
                        <a className="opacity-100" href={(application.server.includes("https://")? application.server : "https://" + application.server)}>{application.server}</a>
                    </div>
                    <div>
                        <p className="opacity-50 inline">Position: </p>
                        <span>{application.position}</span>
                    </div>
                </div>

                <div className="border-b border-opacity-5 border-black dark:border-muted/100 pb-2 mt-2">
                    <p className="font-semibold inline">Bio: </p>
                    <p className="opacity-50 inline">{application.about}</p>
                </div>
                <div className="border-b border-opacity-5 border-black dark:border-muted/100 pb-2 mt-2">
                    <p className="font-semibold inline">Why do you want to be staff:  </p>
                    <p className="opacity-50 inline">{application.message}</p>
                </div>
                <div className="mt-2">
                    <p className="font-semibold inline">Availabilities: </p>
                    <p className="opacity-50 inline">{application.avail}</p>
                </div>
                {bottomValue !== null && bottomValue}
            </div>
        </div>
    )

}