<template>
  <div @click="$emit('click-outside', $event)">
    <div class="bg-white flex flex-col gap-6 px-6 py-10 items-center">      
      <RouterLink 
        v-for="route of routes"
        :key="route.name" 
        :to="route.to" 
        class="link text-black/50 uppercase self-center"
        :class="{
          'active': route.name === activeRoute        
        }"
        @click.stop="$emit('toggle-menu')"
      >
        {{ route.name }}
      </RouterLink>    
    </div>
  </div>
</template>

<script lang="ts" setup>
import { emit } from 'process';
import { RouteLocationRaw } from 'vue-router';
import BaseButton from './BaseButton.vue';

  defineProps({
    routes: Array as () => { name: string, to: RouteLocationRaw }[],    
    activeRoute: String,
  });

  defineEmits<{
    (e:'toggle-menu'):  void,
    (e:'click-outside'):  void
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
</style>