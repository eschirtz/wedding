<template>
  <div class="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 gap-10 my-32 justify-center max-w-4xl mx-auto">
    <div class="flex">
      <BaseImage style="width: 230px; height: 372px" src="hannah-surf.jpg" lazy-src="hannah-surf-lazy.jpg"
        class="rounded shadow hannah-surf" />
      <BaseImage style="width: 230px; height: 372px" src="eric-surf.jpg" lazy-src="eric-surf-lazy.jpg"
        class="rounded shadow eric-surf" />
    </div>
    <div class="writeup text-left">
      <h4 class="font-display text-4xl mb-4">How they met</h4>
      <p class="font-body text-base text-black/50">
        It was the summer of 2015 when Hannah & a few of her friends hopped on Eric's boat. She was relatively new to
        the Lake Geneva area but Eric, born and raised on Geneva Lake, was able to show Hannah what #lakelife was all
        about.
        <br />
        <br />
        Hannah caught on fairly quickly to wake-boarding, but Eric exhibited tremendous patience while teaching Hannah
        to wake-surf. It wasn't love at first sight, but it was the beginning of the rest of their lives.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BaseImage from '@/components/BaseImage.vue';
</script>

<style>
.eric-surf {
  transition-delay: 0.3s;
  transition-property: opacity, transform;
  transition-duration: 0.5s;
  opacity: 0;
  transform: translate(-4px, 0px) scale(1.1);
}

.intersected .eric-surf {
  opacity: 1;
  transform: translate(-16px, -16px) rotate(5deg);
}

.hannah-surf {
  transition-property: opacity, transform;
  transition: transform 1s;
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
  transition-delay: 0.5s;
  transition-timing-function: ease-out;
  transform: translateY(16px);
}

.intersected .writeup {
  opacity: 100%;
  transform: translateY(0)
}
</style>