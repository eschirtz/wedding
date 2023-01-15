<template>
  <component :is="to && !disabled ? 'router-link' : href ? 'a' : 'button'" :href="href ? href : undefined" :to="to"
    :tag="to ? 'a' : undefined"
    class="text-xl font-sans text-black/50 transition-colors duration-300 pointer-events-auto py-2 px-4 select-none border border-black/25 bg-white/25 hover:bg-white/50 hover:text-black hover:border-black backdrop-blur cursor-pointer">
    {{ label }}
  </component>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from "vue-router"
defineProps<{ label: string, to?: RouteLocationRaw, disabled?: boolean, href?: string }>()
</script>


<style scoped>

</style>
