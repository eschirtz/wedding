<template>
  <div>
    <h2 class="font-display text-black text-6xl lg:text-8xl">
      {{ title }}
    </h2>
    <BaseImage src="garland-2.png" class="w-32 h-16 lg:w-56 lg:h-36 mx-auto -rotate-6"/>
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