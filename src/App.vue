<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts" setup name="App">
import useTheme from '@/utils/hooks/useTheme'
const theme = computed(() => {
  const route = useRoute()
  return route?.query?.theme ?? 'blue'
})
const { setBodyClassName } = useTheme()
setBodyClassName(theme.value ?? 'blue')
</script>
