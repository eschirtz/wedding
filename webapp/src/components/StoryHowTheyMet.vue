<template>
  <div class="flex w-96 h-80 shrink-0 max-w-md relative">
    <div class="absolute top-0 left-0">
      <BaseImage class="w-48 h-80 rounded shadow hannah-surf" src="hannah-surf.jpg" lazy-src="hannah-surf-lazy.jpg" />
    </div>
    <div class="absolute top-0 -right-6">
      <BaseImage class="w-52 h-80 rounded shadow eric-surf" src="eric-surf.jpg" lazy-src="eric-surf-lazy.jpg" />
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
.eric-surf {
  transition-delay: 0.1s;
  transition-property: opacity, transform;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  opacity: 0;
  transform: translate(-32px, 8px) scale(1.1);
}

.intersected .eric-surf {
  opacity: 1;
  transform: translate(-16px, 0px) rotate(5deg);
  transition-duration: 1s;
  transition-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

.hannah-surf {
  transition-property: opacity, transform;
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
  opacity: 0;
  transform: translate(4px, 0px) scale(1.1);
}

.intersected .hannah-surf {
  opacity: 1;
  transform: translate(0, 16px) scale(1) rotate(-6deg);
  transition-duration: 1s;
  transition-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

</style>