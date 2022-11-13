<template>
  <div class="flex items-center justify-center" @click="toggle">
    <div class="z-10">
      <h1 class="text-amber-100 text-5xl md:text-8xl">Eric + Hannah</h1>    
    </div>
    <!-- Final image -->
    <!-- <img 
      v-if="loaded16w && loaded200w"
      :src="photo2560w"
      @load="onLoad"
      class="dynamic-image absolute w-screen h-screen z-0 object-cover"
      :class="{['opacity-0']: !loadedFinal}"
    /> -->
    <!-- 200w lazy -->
    <!-- <Transition name="reveal-200w">
      <img
        v-if="loaded16w && !loadedFinal" 
        :src="photo200w"
        @load="onLoad"
        class="lazy-source absolute w-screen h-screen z-0 object-cover blur-lg opacity-0"      
      />
    </Transition> -->
    <!-- 16w lazy -->
    <Transition name="reveal-16w"
      enter-active-class="transition-all duration-1000"
      enter-from-class="!opacity-0"
    >
      <img
        v-show="loaded16w && !loaded200w"
        :src="photo16w"
        @load="onLoad"
        class="opacity-100 absolute w-screen h-screen z-0 object-cover blur-lg"
      />
    </Transition>
  </div>
</template>

<script lang="ts" setup>import { ref } from 'vue';

  const bucketURL = 'https://storage.googleapis.com/eric-and-hannah.appspot.com/';

  const photoBaseURL = 'page-az/IMG_3979';  

  const photo2560w = bucketURL + photoBaseURL + "_2560x2560.jpeg";
  const photo1280w = bucketURL + photoBaseURL + "_1280x1280.jpeg";
  const photo600w = bucketURL + photoBaseURL + "_600x600.jpeg";
  const photo200w = bucketURL + photoBaseURL + "_200x200.jpeg";
  const photo16w = bucketURL + photoBaseURL + "_16x16.jpeg";

  const loaded16w = ref(false);
  const left16w = ref(false);
  
  const loaded200w = ref(false);
  const loadedFinal = ref(false)

  function onLoad() {
    if (!loaded16w.value) loaded16w.value = true;
    else if (!loaded200w.value) loaded200w.value = true;
    else loadedFinal.value = true;
  }

  function leave16w() {
    console.log('animated out');
    left16w.value = true
  }

  function toggle() {
    console.log('toggled');
    loaded16w.value = !loaded16w.value
  }
  
</script>

<style scoped>
</style>