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
import useTheme from '@/utils/hooks/useTheme'
const theme: any = computed(() => {
  const route = useRoute()
  return route?.query?.theme ?? 'blue'
})
const { setBodyClassName } = useTheme()
setBodyClassName(theme.value ?? 'blue')
const $storeApp = useAppStore()
$storeApp.$tenantCode = ''
$storeApp.$authorization = ''
$storeApp.$app = ''
$storeApp.$clientType = ''
$storeApp.$clientId = ''
</script>
