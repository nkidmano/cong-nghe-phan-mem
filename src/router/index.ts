import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((routeTo, routeFrom, next) => {
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired)

  if (!authRequired) return next()

  store.getters['auth/currentUser'] ? next() : next({ name: 'login' })
})

export default router
