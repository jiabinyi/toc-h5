import {
  createRouter,
  createWebHashHistory,
  Router,
  RouteRecordRaw
} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {}
  },
  // 大转盘活动
  {
    path: '/marquee',
    name: 'marquee',
    component: () => import('@/views/marquee/index.vue'),
    meta: {}
  }
]
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
