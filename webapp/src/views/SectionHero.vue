<template>
  <section class="relative select-none overflow-hidden light-fade">
    <div class="z-10 text-center absolute left-0 right-0 flex flex-col items-center justify-center pt-32">
      <!-- <h1 class=" text-transparent bg-clip-text bg-gradient-to-b from-amber-50 to-amber-100 text-5xl md:text-8xl flex items-center gap-4 md:gap-7">Eric <span class="text-4xl my-auto">+</span> Hannah</h1>     -->
      <h1 class="animate-in font-display text-stone-800 text-6xl md:text-8xl mb-2">Eric + Hannah</h1>
      <p class="animate-in font-sans text-xs md:text-base">April 19th-22nd, 2024 | Edinburgh, Scotland</p>
    </div>
    <BaseImage :src="photo2560w" :lazy-src="photo16w" class="absolute w-screen h-screen z-0" style="min-height: 900px" />
  </section>
</template>

<script lang="ts" setup>import { ref } from 'vue';
import BaseImage from '../components/BaseImage.vue';
  const bucketURL = 'https://storage.googleapis.com/eric-and-hannah.appspot.com/';

  const photoBaseURL = 'back-to-back/8993';  

  const photo2560w = bucketURL + photoBaseURL + "_2560x2560.jpg";
  const photo1280w = bucketURL + photoBaseURL + "_1280x1280.jpg";
  const photo600w = bucketURL + photoBaseURL + "_600x600.jpg";
  const photo200w = bucketURL + photoBaseURL + "_200x200.jpg";
  const photo16w = bucketURL + photoBaseURL + "_16x16.jpg";
  
</script>

<style scoped>
.light-fade::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 270px;
}

.transition-class {
  transition-property: opacity, transform;
  transition-duration: 2s;
  transition-timing-function: cubic-bezier(.07,.31,.15,1);
}

.animate-in {
  /* animation: reveal 2 ease-out 1s 1 forwards;   */
  animation-name: reveal;
  animation-duration: 2s;
  animation-delay: 300ms;
  animation-fill-mode: both;

}

@keyframes reveal {
  0% {
    transform: scale(1.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>