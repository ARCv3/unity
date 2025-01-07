import { MemberLabel } from "@/components/ui/MemberLabel";
import { useBackend } from "@/hooks/use-backend"
import { DEFAULT_USER_RESPONSE } from "@/lib/definitions"
import { useEffect, useState } from "react"

export default function UserColumn({
  userid,
  placement="right"
}: {
  userid: string,
  placement?: string
}) {

  const [ user, setUser ] = useState(DEFAULT_USER_RESPONSE)
  const { actions } = useBackend(false);

  useEffect(() => {
    actions.fetchUser(userid).then(x => {
      setUser(x);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userid])

  return (
    <MemberLabel user={user} placement={placement} />
  )
}