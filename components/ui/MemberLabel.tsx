import { useBackend } from "@/hooks/use-backend";
import { UserResponse } from "@/lib/definitions";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export function MemberLabel({
  user,
  placement
}: {
  user: UserResponse,
  placement: string
}) {

  const { utils } = useBackend(false);
  
  return (<div className="flex align-items-center justify-center">
    { 
      placement === "left" && 
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate text-lg font-semibold">{user.global_name}</span>
      </div>
    }
    <div>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={utils.getUserIconUrl(user)} alt={user.username} />
        <AvatarFallback className="rounded-lg">?</AvatarFallback>
      </Avatar>
    </div>
    { 
      placement === "right" && 
      <div className="grid flex-1 text-left text-sm leading-tight ml-2">
        <span className="truncate text-lg font-semibold">{user.username}</span>
      </div>
    }
  </div>)
}