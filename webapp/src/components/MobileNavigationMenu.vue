<template>
  <div @click="$emit('click-outside', $event)">
    <div class="bg-stone-100 backdrop-blur-lg flex flex-col gap-4 p-6 items-center">      
      <RouterLink 
        v-for="route of routes" 
        :key="route.name" 
        :to="route.to" 
        class="text-stone-600 uppercase self-center"
        @click.stop="$emit('toggle-menu')"
      >
        {{ route.name }}
      </RouterLink>    
      <BaseButton label="RSVP" class="max-w-sm mt-4"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { emit } from 'process';
import { RouteLocationRaw } from 'vue-router';
import BaseButton from './BaseButton.vue';

  defineProps({
    routes: Array as () => { name: string, to: RouteLocationRaw }[],
    user: Object
  });

  defineEmits<{
    (e:'toggle-menu'):  void,
    (e:'click-outside'):  void
  }>();
</script>
<style scoped>

</style>