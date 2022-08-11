<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts" setup name="App">
import { sessions } from 'mosowejs'
import http from '@/axios/axios'
import api from '@/axios/apiNames'
import useTheme from '@/utils/hooks/useTheme'
import useGetQuery from '@/utils/hooks/useGetQuery'
const { getUrlParam } = useGetQuery()
const { setBodyClassName } = useTheme()
setBodyClassName(getUrlParam('theme') ?? 'blue')

/**
 * 设置sessionStorage
 * @param key 键
 * @param value 值
 */
const setSession = (key: string, value: string) => {
  sessions.set(key, value)
}
const keys: string[] = [
  'client_id',
  'js_code',
  'tenant',
  'username',
  'password',
  'uuid'
]
keys.forEach((key: string) => {
  setSession(key, getUrlParam(key) ?? '')
})
onMounted(() => {
  const token: string = sessions.get('token') ?? ''
  !token && getActivityTaskList()
})
const getActivityTaskList = async () => {
  const jsCode: string = getUrlParam('js_code') ?? ''
  const clientId: string = getUrlParam('client_id') ?? ''
  const grantType: string = getUrlParam('grant_type') ?? ''
  const params = {
    url: api.getToken,
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: {
      grant_type: grantType,
      client_id: clientId,
      js_code: jsCode
    }
  }
  const res = await http.post(params)
  console.log('res: ', res)
}
</script>
