
import { DEFAULT_GUILD_RESPONSE, GuildResponse } from '@/lib/definitions'
import {create} from 'zustand'


interface GlobalState {
  guild: GuildResponse,
  setGuild: (to: GuildResponse) => void
}


export const useGlobalState = create<GlobalState>((set) => ({

  guild: DEFAULT_GUILD_RESPONSE,
  setGuild: (to:GuildResponse) => set(() => ({guild: to})) 

}))
