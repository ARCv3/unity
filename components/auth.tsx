"use client";

import { useAuthToken } from '@/hooks/use-auth-token'
import {useEffect} from "react";

export function Auth({
  token
} : {
  token: string
}) {

  const { setToken } = useAuthToken();

  useEffect(() => {
    setToken(token)
  }, [token, setToken])

  return (
    <section style={{display: "none"}}>
      {token}
    </section>
  )
}
