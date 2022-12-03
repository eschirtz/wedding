import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Account from '../views/Account.vue';
import Auth from '../views/Auth.vue';
import { currentUser } from '../plugins/firebase';

function accountGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
){
  const authenticated = currentUser.value !== null;
  if(!authenticated) {
    return next({ path: '/auth' })
  } else {
    return next();
  }
}

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/account', component: Account, beforeEnter: accountGuard },
  { path: '/auth', component: Auth }
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