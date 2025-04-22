"use client";
import { API_BASE_URL, Application, Approval, DEFAULT_APPLICATION, DEFAULT_APPROVAL, DEFAULT_GUILD_RESP_STRIPPED, DEFAULT_GUILD_RESPONSE, DEFAULT_TRANSCRIPT, DEFAULT_TRANSCRIPT_RESPONSE, DEFAULT_USER_RESPONSE, GuildResponse, GuildResponseStripped, Insight, Note, Transcripts, TranscriptsResponse, UserResponse } from "@/lib/definitions";
import * as React from "react"

import axios, { AxiosError, AxiosResponse } from 'axios'
import {useAuthToken} from '@/hooks/use-auth-token'
import { useRedirects } from "./use-redirects";

export function useBackend(init:boolean = true) {
    
    const [isTest, setIsTest] = React.useState<boolean>(false);
    const [me, setMe] = React.useState(DEFAULT_USER_RESPONSE);
    const { token } = useAuthToken();
    const {redirectLogout} = useRedirects();

    const get = React.useCallback(async (req_uri: string) => await axios.get(req_uri, {
        headers: {
            'Authorization': token
        }
    }), [token])


    const post = React.useCallback(async (req_uri: string, data: unknown) => await axios.post(req_uri, data, {
        headers: {
            'Authorization': token
        }
    }), [token])


    const sendApproval = React.useCallback(async (guild: string, id: string) : Promise<AxiosResponse> => {
        return await post(`${API_BASE_URL}/api/applications/${guild}/${id}/approve`, {

        })
    }, [post])

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

    const fetchGuildApplications = React.useCallback(async (id: string) : Promise<Application[]> => {

        if (isTest) {
            return [DEFAULT_APPLICATION]
        }

        const res = await get(`${API_BASE_URL}/api/applications/${id}`)
        return res.data

    }, [isTest, get])

    const fetchGuildApplicationApproals = React.useCallback(async (id: string) : Promise<Approval[]> => {
        if (isTest) {
            return [DEFAULT_APPROVAL]
        }

        const res = await get(`${API_BASE_URL}/api/applications/${id}/approvals`);
        return res.data;

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

        try {
            const res = await get(req_uri);
    
            return res.data;
    
        } catch ( e : unknown ) {

            if (isAxiosError(e)) {
                if (e.request.responseURL.endsWith("/login")) {
                    redirectLogout();
                }
            }
        }

        return DEFAULT_USER_RESPONSE;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTest, get])

    function isAxiosError(candidate: unknown): candidate is AxiosError {

        if (candidate && typeof candidate === 'object' && 'isAxiosError' in candidate) {
            return true;
        }
        return false;
    }

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
            sendApproval,
            fetchGuild,
            fetchMe,
            fetchMyGuilds,
            fetchInsights,
            fetchUser,
            fetchGuildTranscripts,
            fetchTranscriptMessages,
            fetchTranscriptMessagesGuildId,
            fetchAllGuildNotes,
            fetchNotes,
            fetchGuildApplicationApproals,
            fetchGuildApplications,
        },
        utils: {
            getIconUrl,
            getUserIconUrl
        }
    }

}