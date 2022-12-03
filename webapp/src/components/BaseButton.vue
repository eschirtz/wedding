<template>
  <component :is="to && !disabled ? 'router-link' : href ? 'a' : 'button'" :href="href ? href : undefined" :to="to"
    :tag="to ? 'a' : undefined"
    class="text-lg font-sans text-stone-400 transition-colors duration-100 pointer-events-auto py-2 px-3 select-none border border-stone-400">
    {{ label }}
  </component>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from "vue-router"
defineProps<{ label: string, to?: RouteLocationRaw, disabled?: boolean, href?: string }>()
</script>


<style scoped>

</style>
