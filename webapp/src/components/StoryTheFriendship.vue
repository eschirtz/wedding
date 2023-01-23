<template>
  <div class="flex w-96 shrink-0 relative h-96">
    <div class="absolute top-0 right-0">
      <BaseImage 
        src="game-day.jpg" 
        lazy-src="game-day-lazy.jpg" 
        class="rounded shadow w-60 h-40 -rotate-6 transition opacity-0" 
        :class="{
          '-translate-x-7': !active,
          'translate-y-7': !active,
          '!opacity-100': active,
        }" 
      />
    </div>
    <div class="absolute bottom-0 right-0">
      <BaseImage 
        src="wat.jpg" 
        lazy-src="wat-lazy.jpg" 
        class="rounded shadow w-56 h-52 rotate-6 transition delay-100 opacity-0"
        :class="{
          '-translate-x-7': !active,
          '-translate-y-7': !active,
          '!opacity-100': active,
        }" 
      /> 
    </div>
    <div class="absolute top-6 left-0">
      <BaseImage 
        src="party.jpg" 
        lazy-src="party-lazy.jpg" 
        class="rounded shadow w-52 h-60 -rotate-3 transition delay-200 opacity-0"
        :class="{
          'translate-x-7': !active,
          'translate-y-4': !active,
          '!opacity-100': active,
        }"
      />
    </div>
    <div class="absolute bottom-0 left-0">
      <BaseImage src="passport.png" class="w-36 h-48 -rotate-12 transition scale-125 delay-300 opacity-0" :class="{ '!scale-100': active, '!opacity-100': active }" contain /> 
    </div>
    <div class="absolute -bottom-6 right-4">
      <BaseImage src="baht.png" class="w-12 h-16 -rotate-45 transition scale-125 delay-300 opacity-0" :class="{ '!scale-100': active, '!opacity-100': active, '-translate-y-4': !active }" contain /> 
    </div>
    <div class="absolute -bottom-12 left-1/2">
      <BaseImage src="10baht.png" class="w-16 h-28 -rotate-6 transition scale-125 delay-500 opacity-0" :class="{ '!scale-100': active, '!opacity-100': active, '-translate-y-5': !active }" contain /> 
    </div>
    <div class="absolute -bottom-12 right-20">
      <BaseImage src="baht.png" class="w-12 h-16 rotate-12 transition scale-125 delay-700 opacity-0" :class="{ '!scale-100': active, '!opacity-100': active, '-translate-y-6': !active }" contain /> 
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
.transition {
  transition-property: opacity, transform;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(.14,.64,.26,.99);
}

</style>