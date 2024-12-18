
import { API_BASE_URL, DEFAULT_GUILD_RESP_STRIPPED, DEFAULT_GUILD_RESPONSE, DEFAULT_TRANSCRIPT, DEFAULT_TRANSCRIPT_RESPONSE, DEFAULT_USER_RESPONSE, GuildResponse, GuildResponseStripped, Insight, Transcripts, TranscriptsResponse, UserResponse } from "@/lib/definitions";
import * as React from "react"

import axios from 'axios'
import { useRouter } from "next/navigation";

export function useBackend(init:boolean = true) {
    
    const [isTest, setIsTest] = React.useState<boolean>(false);
    const [loginState, setLoginState] = React.useState(false);
    const [me, setMe] = React.useState(DEFAULT_USER_RESPONSE);
    const { push } = useRouter();

    const fetchGuild = async (id: string) : Promise<GuildResponse> => {

        if (isTest) {
            return DEFAULT_GUILD_RESPONSE;
        }

        const res = await axios.get(`${API_BASE_URL}/api/discord/guilds/${id}`);
        return res.data;
    } 

    const fetchGuildTranscripts = React.useCallback(async (id: string): Promise<TranscriptsResponse[]> => {

        if (isTest) {
            return [DEFAULT_TRANSCRIPT_RESPONSE];
        }

        const res = await axios.get(`${API_BASE_URL}/api/transcripts/${id}`);
        return res.data;

    }, [isTest])

    const fetchTranscriptMessages = React.useCallback(async (transcript: TranscriptsResponse): Promise<Transcripts> => {
        
        if (isTest) {
            return new Transcripts([DEFAULT_TRANSCRIPT])
        }

        const res = await axios.get(`${API_BASE_URL}/api/transcripts/${transcript.GuildSnowflake}/${transcript.modmailId}`)
        return  res.data;

    }, [isTest])

    const fetchTranscriptMessagesGuildId = React.useCallback(async (guildid: string, transcriptID: string): Promise<Transcripts> => {
        
        if (isTest) {
            return new Transcripts([DEFAULT_TRANSCRIPT])
        }

        const res = await axios.get(`${API_BASE_URL}/api/transcripts/${guildid}/${transcriptID}`)
        return new Transcripts(res.data);

    }, [isTest])

    const fetchUser = React.useCallback(async (id: string): Promise<UserResponse> => {
        if (isTest) {
            return DEFAULT_USER_RESPONSE;
        }

        const res = await axios.get(`${API_BASE_URL}/api/discord/users/${id}`);
        return res.data;
    }, [isTest])

    const fetchMe =  React.useCallback(async () : Promise<UserResponse> => {
        if (isTest) {
            return DEFAULT_USER_RESPONSE;
        }

        const res = await axios.get(`${API_BASE_URL}/v2/api/discord/me`);

        push(res.request.responseURL);

        return res.data;
    }, [isTest])

    const fetchMyGuilds = async() : Promise<GuildResponseStripped[]> => {
        if (isTest) {
            return [DEFAULT_GUILD_RESP_STRIPPED]
        }
        const res = await axios.get(`${API_BASE_URL}/api/discord/me/guilds`);


        if (typeof res.data  === "string")
            return []

        return res.data
    }

    const fetchInsights = async(guildData: GuildResponse) : Promise<Insight[]> => {
        if (isTest) {
            return []
        }

        const res = await axios.get(`${API_BASE_URL}/api/insights?guildid=${guildData.id}`)

        if (typeof res.data  === "string")
            return []

        return res.data;
    }

    const getIconUrl = (guild: GuildResponse | GuildResponseStripped) : string => {
        const GuildIcon = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`;
        return GuildIcon;
    }

    const getUserIconUrl = (user: UserResponse) : string => {
        const UserIcon = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;
        return UserIcon;
    }

    React.useEffect(() => {

        if (init) {
            fetchMe().then(x => {
                setMe(x)
            })
        }

    }, [loginState, isTest, fetchMe])

    return {
        consts : {
            me
        },
        hooks : {
            isTest,
            setIsTest,
            loginState,
            setLoginState,

        },
        actions : {
            fetchGuild,
            fetchMe,
            fetchMyGuilds,
            fetchInsights,
            fetchUser,
            fetchGuildTranscripts,
            fetchTranscriptMessages,
            fetchTranscriptMessagesGuildId
        },
        utils: {
            getIconUrl,
            getUserIconUrl
        }
    }

}