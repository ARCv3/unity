"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useBackend } from "@/hooks/use-backend";
import { DEFAULT_USER_RESPONSE} from "@/lib/definitions";
import { IdCard, Mail } from "lucide-react";
import { useEffect, useState } from "react";

export function ProfilePage({
  test = false
}: {
  test: boolean
}) {

  const { utils, actions, hooks } = useBackend();
  const [user, setUser] = useState(DEFAULT_USER_RESPONSE)

  useEffect(() => {

    hooks.setIsTest(test)
    
    actions.fetchMe().then(x => {
      setUser(x);
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="py-10 h-full w-full bg-muted/50 flex max-md:flex-col rounded-lg">
      <div className="border-r-2 border-muted flex-1 flex-col flex justify-between align-items-center">
        <div className="flex flex-col justify-center align-items-center">
          <Avatar className="h-[10vw] w-[10vw] rounded-full min-h-[150px] min-w-[150px] max-h-[200px] max-w-[200px]">
            <AvatarImage src={utils.getUserIconUrl(user)} alt={user.username} />
            <AvatarFallback className="rounded-lg">?</AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold">{user.username}</h1>
          <p className="capitalize">{user.data.role}</p>
        </div>
        <div className="px-10 w-full max-w-[700px] mx-auto mt-10 flex flex-col justify-start">
          <span className="flex">
            <Mail className="pr-2" />
            <p>
              {user.email}
            </p>
          </span>
          <span className="flex">
            <IdCard className="pr-2"/>
            <p>{user.id}</p>
          </span>

        </div>
      </div>
      <div className="border-l-2 border-muted flex-1">

      </div>
    </div>
  )
}