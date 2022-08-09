import {
  createRouter,
  createWebHashHistory,
  Router,
  RouteRecordRaw
} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/marquee'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {}
  },
  {
    path: '/marquee',
    name: 'marquee',
    component: () => import('@/views/marquee/index.vue'),
    meta: {}
  }
];
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
