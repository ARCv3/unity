import { SIDEBAR_COOKIE_MAX_AGE, SIDEBAR_COOKIE_NAME } from "@/components/unity/team-switcher"
import { BASE_URI, USE_HTTPS } from "@/lib/definitions"
import { NextResponse } from "next/server"


async function GetTranscript( req: Request,
    { params } : { params: Promise<{id: string, guild: string}> }
) {

    const { id, guild } = (await params)

    const response = NextResponse.redirect(`http${USE_HTTPS? 's': ''}://${BASE_URI}/dashboard/transcripts/${id}`)

    response.cookies.set({
        name: SIDEBAR_COOKIE_NAME,
        value: guild,
        maxAge: SIDEBAR_COOKIE_MAX_AGE,
        httpOnly: true,
        sameSite: "strict",
    });

    return response

}


export {
    GetTranscript as GET
}