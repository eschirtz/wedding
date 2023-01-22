<template>
  <div class="flex w-full max-w-md items-center justify-center">
    <div class="fam w-72 h-96 relative">
      <BaseImage class="w-full h-full rounded shadow-lg" src="fam.jpg" lazy-src="fam-lazy.jpg" />   
      <div class="kevin absolute -right-8 bottom-2">
        <BaseImage class="w-24 h-24 drop-shadow" src="kevin-tag.png" contain />
      </div>
      <div class="leo absolute -left-6 -bottom-8">
        <BaseImage class="w-24 h-24 drop-shadow" src="leo-tag.png" contain />
      </div>
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

.kevin {
  transform-origin: 48% 16px;
  opacity: 0;
  animation-delay: 0s;
  animation-duration: 3.2s;
}

.leo {
  transform-origin: 50% 12px;
  opacity: 0;
  animation-delay: 0.3s;
  animation-duration: 3s;
}

.intersected .kevin, .intersected .leo {
  transition-property: opacity;
  transition-duration: 0.8s;
  opacity: 1;  
  animation-name: pendulum;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes pendulum {
  0% {
    transform: rotate(50deg)
  }
  10% {
    transform: rotate(-45deg);
  }
  20% {
    transform: rotate(40deg);
  }
  30% {
    transform: rotate(-35deg);
  }
  40% {
    transform: rotate(30deg);
  }
  50% {
    transform: rotate(-21deg);
  }
  60% {
    transform: rotate(13deg);
  }
  70% {
    transform: rotate(-6deg);
  }
  80% {
    transform: rotate(3deg);
  }
  90% {
    transform: rotate(-1deg);
  }
  100% {
    transform: rotate(0);
  }
}
</style>