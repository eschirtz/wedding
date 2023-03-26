<template>
  <component :is="to && !disabled ? 'router-link' : href ? 'a' : 'button'" :href="href ? href : undefined" :to="to"
    :tag="to ? 'a' : undefined"
    class="text-xl font-sans text-black/75 pointer-events-auto py-2 px-4 select-none border border-black/25 bg-white/25 hover:bg-white/50 hover:text-black hover:border-black backdrop-blur cursor-pointer overflow-ellipsis whitespace-nowrap min-w-0 overflow-hidden flex items-center">
    <Icon v-if="icon" :icon="icon" width="18px" height="18px" class="mr-2"/>{{ label }}
  </component>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from "vue-router"
import Icon from './Icon.vue';
defineProps<{ label: string, to?: RouteLocationRaw, disabled?: boolean, href?: string, icon?: string }>()
</script>


<style scoped>

</style>
