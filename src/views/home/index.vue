<template>
  <div class="home-container">
    <nut-button type="primary" @click="toPage">跑马灯</nut-button>
    <div>姓名：{{ name }}</div>
    <div>年龄：{{ age }}</div>
  </div>
</template>
<script lang="ts" setup name="Home">
import { useUserStore } from '@/store/modules/user'
import http from '@/axios/axios'
import api from '@/axios/apiNames'
const router = useRouter()
const store = useUserStore()
const name = computed(() => store.getUserInfo?.name ?? '--')
const age = computed(() => store.getUserInfo?.age ?? '--')
onMounted(() => {
  store.setUserInfo({ name: '张三疯', age: 120 })
  getActivityTaskList()
})
const getActivityTaskList = async () => {
  const params = {
    url: api.getToken,
    data: {}
  }
  const res = await http.post(params)
  console.log('res: ', res)
}
const toPage = () => {
  router.push({ path: '/marquee', query: {} })
}
</script>
