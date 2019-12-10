import store from '@/store'
import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    beforeEnter: (routeTo, routeFrom, next) => {
      store.getters['auth/loggedIn'] ? next({ name: 'home' }) : next()
    },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      authRequired: true,
      viewName: 'Working Tasks',
    },
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/views/Setting.vue'),
    meta: {
      // TODO change authRequired to true
      authRequired: false,
      viewName: 'Settings',
    },
  },
  {
    path: '*',
    redirect: { name: 'home' },
  },
]

export default routes
