<template>
  <div 
    class="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 gap-10 my-32 justify-items-center items-center max-w-6xl mx-auto"
    :class="[active ? 'intersected' : '']"
  >
    <div class="flex w-full max-w-md">
      <BaseImage style="width: 100%; height: 372px" src="hannah-surf.jpg" lazy-src="hannah-surf-lazy.jpg"
        class="rounded shadow hannah-surf" />
      <BaseImage style="width: 100%; height: 372px" src="eric-surf.jpg" lazy-src="eric-surf-lazy.jpg"
        class="rounded shadow eric-surf" />
    </div>
    <div class="writeup text-left">
      <h4 class="font-display text-4xl mb-6">{{ title }}</h4>
      <p class="font-body text-base text-black/50">
        <template v-for="p in story">  
          <span>
            {{ p }}
          </span>
          <br />
          <br />
      </template>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BaseImage from '@/components/BaseImage.vue';

defineProps({
  title: String,
  story: Array as () => string[],
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

.writeup {
  opacity: 0;
  transition-property: opacity, transform;
  transition-duration: 1s;
  transition-delay: 0.3s;
  transition-timing-function: ease-out;
  transform: translateY(32px);
}

.intersected .writeup {
  opacity: 100%;
  transform: translateY(0)
}
</style>