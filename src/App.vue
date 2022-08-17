<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts" setup name="App">
import { getUserInfo } from '@/axios'
import { useRequest } from 'vue-request'
import { sessions } from 'mosowejs'
import { useUserStore } from '@/store/modules/user.ts'
const UserStore = useUserStore()
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
const keys: string[] = ['token', 'clientType', 'envVersion']
keys.forEach((key: string) => {
  setSession(key, getUrlParam(key) ?? '')
})

// 领取免费次数任务列表
const { run: runGetUserInfo } = useRequest(getUserInfo, {
  manual: true,
  onSuccess: (res: ResObjData) => {
    if (res) {
      setSession('userInfo', JSON.stringify(res.data ?? {}))
      setSession('cust_id', res.data.cust_id)
      UserStore.userInfo = res.data
    }
  }
})
runGetUserInfo()
</script>
