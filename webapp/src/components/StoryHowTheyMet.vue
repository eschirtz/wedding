<template>
  <div class="flex w-full max-w-md">
    <BaseImage class="w-full h-72 lg:h-96 rounded shadow hannah-surf" src="hannah-surf.jpg" lazy-src="hannah-surf-lazy.jpg" />
    <BaseImage class="w-full h-72 lg:h-96 rounded shadow eric-surf" src="eric-surf.jpg" lazy-src="eric-surf-lazy.jpg" />
  </div>
</template>

<script lang="ts" setup>
import BaseImage from '@/components/BaseImage.vue';

defineProps({ 
  active: Boolean
});

</script>

<style scoped>
.eric-surf {
  transition-delay: 0.2s;
  transition-property: opacity, transform;
  transition-duration: 0.4s;
  transition-timing-function: ease-out;
  opacity: 0;
  transform: translate(-4px, 0px) scale(1.1);
}

.intersected .eric-surf {
  opacity: 1;
  transform: translate(-16px, -16px) rotate(5deg);
}

.hannah-surf {
  transition-property: opacity, transform;
  transition: transform 0.4s;
  transition-timing-function: ease-out;
  opacity: 0;
  transform: translate(4px, 0px);
}

.intersected .hannah-surf {
  opacity: 1;
  transform: translate(0, 16px) scale(0.9) rotate(-8deg);
}

</style>