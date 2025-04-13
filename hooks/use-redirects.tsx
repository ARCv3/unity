import { API_BASE_URL, STATUS_SITE_URL } from "@/lib/definitions";
import { useRouter } from "next/navigation";
import * as React from "react"

export function useRedirects() {
  
  const { push } = useRouter();

  const redirectAuthLogin = React.useCallback(() => {
    
    push(`${API_BASE_URL}/auth/discord`)
      
  }, [push])

  const redirectStatus = React.useCallback(() => {

    push(`${STATUS_SITE_URL}`)
      
  }, [push])

  const redirectDash = React.useCallback(() => {

    push(`dashboard`)
      
  }, [push])

  const redirectLogin = React.useCallback(() => {
    push(`login`)
  }, [push])
  return {
    redirectAuthLogin,
    redirectStatus,
    redirectDash,
    redirectLogin
  }

}