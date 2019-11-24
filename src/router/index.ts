import Vue from 'vue';
import VueRouter from 'vue-router';
import { StorageService } from '@/services';

import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((routeTo, routeFrom, next) => {
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired);

  if (!authRequired) return next();

  StorageService.getToken() ? next() : next({ name: 'login' });
});

export default router;
