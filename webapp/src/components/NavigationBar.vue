<template>
  <nav class="flex justify-center p-4 gap-5">
    <RouterLink 
      v-for="route of routes" 
      :key="route.name" 
      :to="route.to" 
      class="text-stone-600 uppercase self-center"
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
    to: "#home"
  },
  {
    name: "About",
    to: "#apples"
  },
  {
    name: "Dates",
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