import { BASE_URI, USE_HTTPS } from "@/lib/definitions";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {

    const token = request.nextUrl.searchParams.get("token");
    const expiry = request.nextUrl.searchParams.get("expiry")?? "100000";

    console.log(token)

    if (!token) {
        return NextResponse.json({
            status: 500
        })
    }

    const response = NextResponse.redirect(`http${USE_HTTPS? 's' : ''}://${BASE_URI}/login`)

    response.cookies.set({
        name: "session",
        value: token,
        maxAge: parseInt(expiry),
        httpOnly: true,
        sameSite: "strict"
    });

    return response

}