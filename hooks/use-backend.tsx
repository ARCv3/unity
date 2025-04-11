
import { API_BASE_URL, DEFAULT_GUILD_RESP_STRIPPED, DEFAULT_GUILD_RESPONSE, DEFAULT_TRANSCRIPT, DEFAULT_TRANSCRIPT_RESPONSE, DEFAULT_USER_RESPONSE, GuildResponse, GuildResponseStripped, Insight, Note, Transcripts, TranscriptsResponse, UserResponse } from "@/lib/definitions";
import * as React from "react"

import axios from 'axios'
import {useAuthToken} from '@/hooks/use-auth-token'

export function useBackend(init:boolean = true) {
    
    const [isTest, setIsTest] = React.useState<boolean>(false);
    const [me, setMe] = React.useState(DEFAULT_USER_RESPONSE);
    const { token } = useAuthToken();

    const get = React.useCallback(async (req_uri: string) => await axios.get(req_uri, {
        headers: {
            'Authorization': token
        }
    }), [token])

    const fetchGuild = React.useCallback(async (id: string) : Promise<GuildResponse> => {

        if (isTest) {
            return DEFAULT_GUILD_RESPONSE;
        }

        const res = await get(`${API_BASE_URL}/api/discord/guilds/${id}`);
        return res.data;

    }, [get, isTest] )

    const fetchGuildTranscripts = React.useCallback(async (id: string): Promise<TranscriptsResponse[]> => {

        if (isTest) {
            return [DEFAULT_TRANSCRIPT_RESPONSE];
        }

        const res = await get(`${API_BASE_URL}/api/transcripts/${id}`);
        return res.data;

    }, [isTest, get])

    const fetchTranscriptMessages = React.useCallback(async (transcript: TranscriptsResponse): Promise<Transcripts> => {
        
        if (isTest) {
            return new Transcripts([DEFAULT_TRANSCRIPT])
        }

        const res = await get(`${API_BASE_URL}/api/transcripts/${transcript.GuildSnowflake}/${transcript.modmailId}`)
        return  res.data;

    }, [isTest, get])

    const fetchTranscriptMessagesGuildId = React.useCallback(async (guildid: string, transcriptID: string): Promise<Transcripts> => {
        
        if (isTest) {
            return new Transcripts([DEFAULT_TRANSCRIPT])
        }

        const res = await get(`${API_BASE_URL}/api/transcripts/${guildid}/${transcriptID}`)
        return new Transcripts(res.data);

    }, [isTest, get])

    const fetchUser = React.useCallback(async (id: string): Promise<UserResponse> => {
        if (isTest) {
            return DEFAULT_USER_RESPONSE;
        }

        const res = await get(`${API_BASE_URL}/api/discord/users/${id}`);
   
        return res.data;
        
    }, [isTest, get])

    const fetchMe =  React.useCallback(async () : Promise<UserResponse> => {
        if (isTest) {
            return DEFAULT_USER_RESPONSE;
        }

        const req_uri = `${API_BASE_URL}/api/discord/me`
        const res = await get(req_uri);

        if (req_uri !== res.request.responseURL) { 

            return DEFAULT_USER_RESPONSE;
        }

        return res.data;
    }, [isTest, get])

    const fetchNotes = React.useCallback( async(guildid: string, userid: string) : Promise<Note[]> => {

        if (isTest) {
            return []
        }

        const req_uri = `${API_BASE_URL}/api/notes/${guildid}/${userid}`;
        const res = await get(req_uri);

        return res.data;
    }, [isTest, get])

    const fetchAllGuildNotes = async(guildid: string) : Promise<Note[]> => {

        if (isTest) {
            return [];
        }

        const req_uri = `${API_BASE_URL}/api/notes/${guildid}/all`;
        const res  = await get(req_uri);

        return res.data;

    }

    const fetchMyGuilds = React.useCallback(async() : Promise<GuildResponseStripped[]> => {
        if (isTest) {
            return [DEFAULT_GUILD_RESP_STRIPPED]
        }
        
        const res = await get(`${API_BASE_URL}/api/discord/me/guilds`);


        if (typeof res.data  === "string")
            return []

        return res.data
    }, [isTest, get])

    const fetchInsights = async(guildData: GuildResponse) : Promise<Insight[]> => {
        if (isTest) {
            return []
        }

        const res = await get(`${API_BASE_URL}/api/insights?guildid=${guildData.id}`)

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

        if (init && token) {

            fetchMe().then(x => {
                setMe(x)
            })
        }

    }, [fetchMe, init, token])

    return {
        consts : {
            me,
            token
        },
        hooks : {
            isTest,
            setIsTest,

        },
        actions : {
            fetchGuild,
            fetchMe,
            fetchMyGuilds,
            fetchInsights,
            fetchUser,
            fetchGuildTranscripts,
            fetchTranscriptMessages,
            fetchTranscriptMessagesGuildId,
            fetchAllGuildNotes,
            fetchNotes
        },
        utils: {
            getIconUrl,
            getUserIconUrl
        }
    }

}