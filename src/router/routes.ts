import store from '@/store'
import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    beforeEnter: (routeTo, routeFrom, next) => {
      store.getters['auth/currentUser'] ? next({ name: 'home' }) : next()
    },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '*',
    redirect: { name: 'home' },
  },
]

export default routes
