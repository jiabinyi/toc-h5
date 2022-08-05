import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => ({ name: 'test' }),
  actions: {
    updateName(name: string) {
      this.name = name
    }
  }
})
