<template>
  <div>
    <h2 class="font-display text-black text-6xl md:text-8xl">
      {{ title }}
    </h2>
    <BaseImage src="garland.png" class="w-32 h-16 mx-auto"/>
  </div>
</template>

<script lang="ts" setup>
import BaseImage from './BaseImage.vue';

  defineProps({
    title: String,
  });
</script>

<style scoped>

</style>