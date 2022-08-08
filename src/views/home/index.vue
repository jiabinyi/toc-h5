<template>
  <div class="home-container">
    <nut-button type="primary" @click="toPage">跑马灯</nut-button>
    <div>姓名：{{ name }}</div>
    <div>年龄：{{ age }}</div>
  </div>
</template>
<script lang="ts" setup name="Home">
import useTheme from '@/utils/hooks/useTheme'
import { useRouteQuery } from '@vueuse/router'
import { useUserStore } from '@/store/modules/user'
const router = useRouter()
const store = useUserStore()
const name = computed(() => store.getUserInfo?.name ?? '--')
const age = computed(() => store.getUserInfo?.age ?? '--')
onMounted(() => {
  const theme = useRouteQuery('theme') as any
  const { setBodyClassName } = useTheme()
  setBodyClassName(theme.value ?? 'blue')
  store.setUserInfo({ name: '张三疯', age: 120 })
})
const toPage = () => {
  router.push({ path: '/marquee', query: {} })
}
</script>
