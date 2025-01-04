import {create} from 'zustand'

export const useUserStore = create((set) => ({
  
    user:false,
    setUser: (userInfo) => set({ user: userInfo })

  
}))

export const useUserInfoStore = create((set) => ({
  userInfo:[],
  setUserInfo: (userInfo) => set({userInfo: userInfo})
}))
