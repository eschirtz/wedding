<template>
  <button class="text-lg font-sans text-stone-500 transition-colors duration-100 pointer-events-auto py-2 px-3 select-none border border-stone-400">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{ label: string }>()
</script>


<style scoped>
</style>
