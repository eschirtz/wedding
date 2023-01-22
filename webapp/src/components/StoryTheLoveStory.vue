<template>
  <div class="flex w-full max-w-md items-center justify-center">
    <BaseImage class="w-64 h-96 rounded shadow-lg fam" src="fam.jpg" lazy-src="fam-lazy.jpg" />    
  </div>
</template>

<script lang="ts" setup>
import BaseImage from '@/components/BaseImage.vue';

defineProps({ 
  active: Boolean
});

</script>

<style scoped>
.fam {
  transition-delay: 0.1s;
  transition-property: opacity, transform;
  transition-duration: 0.4s;
  transition-timing-function: ease-in-out;
  opacity: 0;
  transform: translate(0, 32px);
}

.intersected .fam {
  opacity: 1;
  transform: translate(0, 0);
  transition-duration: 0.8s;
  transition-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

</style>