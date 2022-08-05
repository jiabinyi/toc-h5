import {
  createRouter,
  createWebHashHistory,
  Router,
  RouteRecordRaw
} from 'vue-router';

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
    path: '/largeTurntable',
    name: 'largeTurntable',
    component: () => import('@/views/largeTurntable/index.vue'),
    meta: {}
  }
];
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
