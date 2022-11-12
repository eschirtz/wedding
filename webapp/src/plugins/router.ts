import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  { path: '/', component: Home },
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