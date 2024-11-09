
import { API_BASE_URL, DEFAULT_GUILD_RESP_STRIPPED, DEFAULT_GUILD_RESPONSE, DEFAULT_USER_RESPONSE, Guild, GuildResponse, GuildResponseStripped, UserResponse } from "@/lib/definitions";
import * as React from "react"

import axios from 'axios'
import { UserIcon } from "lucide-react";




export function useBackend() {
    
    const [isTest, setIsTest] = React.useState<boolean>(false);
    const [loginState, setLoginState] = React.useState(false);
    const [me, setMe] = React.useState(DEFAULT_USER_RESPONSE);

    const fetchGuild = async (id: string) : Promise<GuildResponse> => {

        if (isTest) {
            return DEFAULT_GUILD_RESPONSE;
        }

        const res = await axios.get(`${API_BASE_URL}/api/discord/guilds/${id}`);
        return res.data;
    } 

    const fetchMe = async () : Promise<UserResponse> => {
        if (isTest) {
            return DEFAULT_USER_RESPONSE;
        }

        const res = await axios.get(`${API_BASE_URL}/api/discord/me`);
        return res.data;
    }

    const fetchMyGuilds = async() : Promise<GuildResponseStripped[]> => {
        if (isTest) {
            return [DEFAULT_GUILD_RESP_STRIPPED]
        }
        const res = await axios.get(`${API_BASE_URL}/api/discord/me/guilds`);
        return res.data
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
        fetchMe().then(x => {
            setMe(x)
        })
    }, [loginState, isTest])

    return {
        consts : {
            me
        },
        hooks : {
            isTest,
            setIsTest,
            loginState,
            setLoginState
        },
        actions : {
            fetchGuild,
            fetchMe,
            fetchMyGuilds,
        },
        utils: {
            getIconUrl,
            getUserIconUrl
        }
    }

}