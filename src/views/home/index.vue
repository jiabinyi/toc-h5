<template>
  <div class="home-container">
    <nut-button type="primary" @click="toPage">跑马灯</nut-button>
  </div>
</template>
<script lang="ts" setup name="Home">
import useTheme from '@/utils/hooks/useTheme'
import { useRouteQuery } from '@vueuse/router'
onMounted(() => {
  const theme = useRouteQuery('theme') as any
  const { setBodyClassName } = useTheme()
  setBodyClassName(theme.value ?? 'blue')
})
const router = useRouter()
const toPage = () => {
  router.push({ path: '/largeTurntable', query: { theme: 'blue' } })
}
</script>
