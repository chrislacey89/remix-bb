import create from 'zustand'

type authState = {
  authenticated: boolean
  setAuthentication: (authenticated: boolean) => void

  showLoginModal: boolean
  setShowLoginModal: () => void

  showSignupModal: boolean
  setShowSignupModal: () => void
  userId: string | null
  setUserId: (userId: string) => void
}
export const useStore = create<authState>(set => ({
  authenticated: false,
  setAuthentication: authenticated => set(() => ({ authenticated })),

  showLoginModal: false,
  setShowLoginModal: () =>
    set(state => {
      !state.showLoginModal
    }),

  showSignupModal: false,
  setShowSignupModal: () =>
    set(state => {
      !state.showSignupModal
    }),
  userId: null,
  setUserId: userId => set(() => ({ userId })),
}))
