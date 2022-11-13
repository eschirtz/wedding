<template>
  <button class="transition-colors duration-100 pointer-events-auto bg-stone-600 hover:bg-stone-500 py-2 px-3 font-serif tracking-widest text-white shadow-md select-none">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{ label: string }>()
</script>


<style scoped>
</style>
