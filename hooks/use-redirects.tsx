import { API_BASE_URL, STATUS_SITE_URL } from "@/lib/definitions";
import { useRouter } from "next/navigation";
import * as React from "react"

export function useRedirects() {
  
  const { push } = useRouter();

  const redirectAuthLogin = React.useCallback(() => {
    
    push(`${API_BASE_URL}/auth/discord`)
      
  }, [push])

  const redirectTranscript = React.useCallback((id: string) => {
    push(`/dashboard/transcripts/${id}`)
  }, [push])

  const redirect = React.useCallback((url: string) => {
    push(url);
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

  const redirectLogout = React.useCallback(() => {
    push('/api/revoke');
  }, [push])

  return {
    redirectLogout,
    redirectAuthLogin,
    redirectTranscript,
    redirect,
    redirectStatus,
    redirectDash,
    redirectLogin
  }

}