<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts" setup name="App">
import { sessions } from 'mosowejs'
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
const keys: string[] = ['token', 'clientType']
keys.forEach((key: string) => {
  setSession(key, getUrlParam(key) ?? '')
})
</script>
