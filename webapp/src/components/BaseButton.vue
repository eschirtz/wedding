<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <button class="transition-colors duration-100 pointer-events-auto bg-amber-600 hover:bg-amber-500 py-2 px-3 font-serif tracking-widest text-white shadow">
    {{ label }}
  </button>
</template>

<style scoped>
</style>
