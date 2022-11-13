<template>
  <nav class="flex justify-center p-4 gap-4">
    <RouterLink 
      v-for="route of routes" 
      :key="route.name" 
      :to="route.to" 
      class="text-amber-900 uppercase self-center"
    >
      {{ route.name }}
    </RouterLink>
    <div class="grow"></div>
    <BaseButton v-if="!user" label="RSVP" />
  </nav>
</template>

<script lang="ts" setup>
import BaseButton from "@/components/BaseButton.vue"

defineProps({
  user: Object
});

const routes = [
  {
    name: "Home",
    to: "/"
  },
  {
    name: "Apples",
    to: "#apples"
  },
  {
    name: "Oranges",
    to: "#oranges"
  },
  {
    name: "Bananas",
    to: "#bananas"
  },
  {
    name: "Peaches",
    to: "#peaches"
  },

]
</script>

<style scoped>
</style>