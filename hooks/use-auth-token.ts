import {create} from 'zustand'

interface AuthTokenState {
  token: string,
  setToken: (to: string) => void,
}

export const useAuthToken = create<AuthTokenState>((set) => ({

  token: "",
  setToken: (to:string) => set(() => ({token: to}))

}))
