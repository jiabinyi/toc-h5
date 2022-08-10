<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts" setup name="App">
import $store from '@/store/store'
import { useAppStore } from '@/store/modules/app.ts'
import { sessions } from 'mosowejs'
import useTheme from '@/utils/hooks/useTheme'
import useGetQuery from '@/utils/hooks/useGetQuery'
const { getUrlParam } = useGetQuery()
const { setBodyClassName } = useTheme()
setBodyClassName(getUrlParam('theme') ?? 'blue')
sessions.set('token', getUrlParam('token'))
const $storeApp = useAppStore()
$storeApp.$tenantCode = ''
$storeApp.$authorization = ''
$storeApp.$app = ''
$storeApp.$clientType = ''
$storeApp.$clientId = ''
</script>
