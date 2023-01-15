<template>
  <nav class="flex justify-center items-center px-8 py-6 gap-5 transition-colors duration-500" :class="showBackground ? ['bg-white'] : []">
    <RouterLink 
      v-for="route of routes" 
      :key="route.name" 
      :to="route.to" 
      class="link text-black/50 font-sans text-xl self-center hidden md:block"
      :class="{
        'active': route.name === activeRoute        
      }"
    >
      {{ route.name }}
    </RouterLink>    
    <Icon icon="mdi-light:menu" class="block md:hidden text-black" @click="$emit('toggle-menu')" />
    <div class="grow" />
    <BaseButton :label="user ? 'My Reservation' : 'RSVP'" to="account" />    
  </nav>
</template>

<script lang="ts" setup>
import BaseButton from "@/components/BaseButton.vue"
import Icon from "@/components/Icon.vue"
import { RouteLocationRaw } from "vue-router";

defineProps({
  routes: Array as () => { name: string, to: RouteLocationRaw }[],
  user: Object,
  activeRoute: String,
  showBackground: Boolean
});

defineEmits<{
  (e:'toggle-menu'):  void
}>();

</script>

<style scoped>
@media (hover:hover) {
  .link:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
  }
}
.link.active {
  cursor: default !important;
  color: black;
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 1px;
}

.show-background {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>