import create from 'zustand'

type authState = {
  authenticated: boolean
  setAuthentication: (authenticated: boolean) => void
}
export const useStore = create<authState>(set => ({
  authenticated: false,
  setAuthentication: authenticated => set(() => ({ authenticated })),
}))
