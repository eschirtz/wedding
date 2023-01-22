<template>
  <div class="flex w-96 shrink-0 relative h-96">
    <div class="absolute -top-8 right-0">
      <BaseImage src="game-day.jpg" lazy-src="game-day-lazy.jpg" class="rounded shadow w-64 h-48 -rotate-6" />
    </div>
    <div class="absolute bottom-0 -right-4">
      <BaseImage src="wat.jpg" lazy-src="wat-lazy.jpg" class="rounded shadow w-64 h-56 rotate-6" /> 
    </div>
    <div class="absolute top-4 -left-8">
      <BaseImage src="party.jpg" lazy-src="party-lazy.jpg" class="rounded shadow w-56 h-60 -rotate-3" />
    </div>
    <div class="absolute -bottom-4 left-0">
      <BaseImage src="passport.png" class="w-36 h-48 -rotate-12" contain /> 
    </div>
    <div class="absolute bottom-0 -left-20">
      <BaseImage src="baht.png" class="w-12 h-16 -rotate-45" contain /> 
    </div>
    <div class="absolute -bottom-12 left-1/2">
      <BaseImage src="10baht.png" class="w-16 h-28 -rotate-6" contain /> 
    </div>
    <div class="absolute -bottom-16 right-20">
      <BaseImage src="baht.png" class="w-12 h-16 rotate-12" contain /> 
    </div>    
  </div>
</template>

<script lang="ts" setup>
import BaseImage from '@/components/BaseImage.vue';

defineProps({ 
  active: Boolean
});

</script>

<style scoped>


</style>