import { defineStore } from 'pinia'
export const useAppStore = defineStore({
  id: 'app',
  state: (): any => ({
    $tenantCode: '',
    $authorization: '',
    $app: '',
    $clientType: '',
    $clientId: ''
  })
})
