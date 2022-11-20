<template>
  <NavigationBar class="fixed top-0 left-0 right-0 z-40" @toggle-menu="menu = !menu" :routes="routes" />
  <MobileNavigationMenu v-if="menu" class="fixed top-0 left-0  bottom-0 right-0 z-50" :routes="routes" @toggle-menu="menu = !menu" @click-outside="menu = false"  />
  <RouterView />
</template>

<script setup lang="ts">
import { ref } from "vue";
import NavigationBar from "@/components/NavigationBar.vue";
import MobileNavigationMenu from '@/components/MobileNavigationMenu.vue'

const menu = ref(false);

const routes = [
  {
    name: "Home",
    to: "#home"
  },
  {
    name: "Our Story",
    to: "#apples"
  },
  {
    name: "The Wedding",
    to: "#oranges"
  },
  {
    name: "Accomodation",
    to: "#bananas"
  },
  {
    name: "FAQ",
    to: "#peaches"
  },
]
</script>

<style scoped>
</style>
