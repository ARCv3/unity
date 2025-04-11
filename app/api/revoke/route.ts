import { BASE_URI, USE_HTTPS } from "@/lib/definitions";
import { NextResponse } from "next/server";

export async function GET() {

    const response = NextResponse.redirect(`http${USE_HTTPS? 's' : ''}://${BASE_URI}/login`)

    response.cookies.set({
        name: "session",
        value: "",
        maxAge: 10,
        httpOnly: true,
        sameSite: "strict"
    });

    return response

}