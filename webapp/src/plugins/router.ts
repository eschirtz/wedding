import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Account from '../views/Account.vue';

function accountGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
){
  const authenticated = false;
  if(!authenticated){
    return next({ path: '/auth' })
  } else {
    return next();
  }
}

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/account', component: Account, beforeEnter: accountGuard }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {      
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
  }
})

export default router;