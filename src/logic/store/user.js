import {create} from 'zustand'

export const useUserStore = create((set) => ({
  
    user:false,
    setUser: (userInfo) => set({ user: userInfo })

  
}))

export const useUserInfoStore = create((set) => ({
  userInfo:[],
  setUserInfo: (userInfo) => set({userInfo: userInfo})
}))

export const useMemberCountStore = create((set) => ({
  memberCount : 0,
  setMemberCount: (count) => set({memberCount: count})
}))

export const useAnonymousStore = create((set) => ({
  isAnonymousAtSchool : true,
  setIsAnonymousAtSchool: (state) => set({isAnonymousAtSchool: state})
}))


export const useAnonymousAtClassStore = create((set) => ({
  isAnonymousAtClasses: true,
  setIsAnonymousAtClass:(state) => set({isAnonymousAtClasses: state})
}))