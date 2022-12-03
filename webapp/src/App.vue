<template>
  <NavigationBar class="fixed top-0 left-0 right-0 z-40" @toggle-menu="menu = !menu" :routes="routes" />
  <MobileNavigationMenu v-if="menu" class="fixed top-0 left-0  bottom-0 right-0 z-50" :routes="routes" @toggle-menu="menu = !menu" @click-outside="menu = false"  />
  <RouterView />
</template>

<script setup lang="ts">
import { ref } from "vue";
import NavigationBar from "@/components/NavigationBar.vue";
import MobileNavigationMenu from '@/components/MobileNavigationMenu.vue'
import { RouteLocationRaw } from "vue-router";

const menu = ref(false);

const routes: {name: string, to: RouteLocationRaw }[] = [
  {
    name: "Home",
    to: { path: '/', hash: '#home' }
  },
  {
    name: "Our story",
    to: { path: '/', hash: '#our-story' }
  },
  {
    name: "The destination",
    to: { path: '/', hash: '#destination' }
  },
  {
    name: "FAQ",
    to: { path: '/', hash: '#faq' }
  },
]
</script>

<style scoped>
</style>
