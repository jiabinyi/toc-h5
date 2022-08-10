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
const route = useRoute()
const { setBodyClassName } = useTheme()
const theme = computed(() => route?.query?.theme ?? 'blue')
const token = computed(() => route?.query?.token ?? '--')
console.log('token: ', token.value)
setBodyClassName(theme.value ?? 'blue')
sessions.set('token', token.value)
</script>
