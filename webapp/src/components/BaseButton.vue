<script setup lang="ts">
// File intentionally contains linting problems
import { ref } from 'vue'

defineProps<{ label: string }>()

const count = ref(0)
</script>

<template>
<button class="pointer-events-auto rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 shadow-lg">
{{label}}
</button>
</template>

<style scoped>
</style>
