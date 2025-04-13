
import { EMPTY_GUILD_RESPONSE, GuildResponse } from '@/lib/definitions'
import {create} from 'zustand'


interface SelectedGuildState {
  guild: GuildResponse,
  setGuild: (to: GuildResponse) => void,
}


export const useSelectedGuildState = create<SelectedGuildState>((set) => ({

  guild: EMPTY_GUILD_RESPONSE,
  setGuild: (to:GuildResponse) => set(() => ({guild: to}))

}))
