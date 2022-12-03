<template>
  <nav class="flex justify-center items-center p-4 gap-5">
    <RouterLink 
      v-for="route of routes" 
      :key="route.name" 
      :to="route.to" 
      class="text-stone-500 font-sans text-lg self-center hidden md:block"
    >
      {{ route.name }}
    </RouterLink>    
    <Icon icon="mdi-light:menu" class="block md:hidden text-stone-500" @click="$emit('toggle-menu')" />
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
  user: Object
});

defineEmits<{
  (e:'toggle-menu'):  void
}>();

</script>

<style scoped>
</style>