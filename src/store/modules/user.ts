import { defineStore } from 'pinia'
import { InfoList } from './model.d'

interface UserState {
  userInfo: Nullable<InfoList>
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({ userInfo: null }),
  getters: {
    getUserInfo(): Nullable<InfoList> {
      return this.userInfo
    }
  },
  actions: {
    setUserInfo(info: Nullable<InfoList>) {
      this.userInfo = info
    },
    resetState() {
      this.userInfo = null
    }
  }
})
