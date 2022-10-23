<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <button class="pointer-events-auto rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 shadow">
    {{ label }}
  </button>
</template>

<style scoped>
</style>
