<template>
  <div class="relative overflow-hidden">
    <img 
      v-if="loadFinalImage" 
      :src="src" 
      class="transition-class scale-100 absolute top-0 left-0 w-full h-full z-0"
      :class="{ ['!scale-110']: !loadedFinalImage && lazySrc, ['object-cover']: !contain, ['object-contain']: contain }"
      @load="loadedFinalImage = true" 
      @error="loadedFinalImage = true" 
    />    
    <Transition leave-active-class="transition-class" leave-to-class="!opacity-0 !scale-100">
      <img 
        v-show="loadedLazySrc && !loadedFinalImage" 
        :src="lazySrc" 
        @load="loadedLazySrc = true"
        @error="loadedLazySrc = true" 
        class="absolute top-0 left-0 w-full h-full z-0 object-cover blur-md scale-110" 
      />
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  lazySrc: {
    type: String,
    required: false,
  },
  contain: Boolean
});

const loadedLazySrc = ref(false);
const loadedFinalImage = ref(false);

const loadFinalImage = computed(() => {  
  return !props.lazySrc || loadedLazySrc.value;
});

</script>

<style scoped>
.transition-class {
  transition-property: opacity, transform;
  transition-duration: 2s;
  transition-timing-function: cubic-bezier(.07, .31, .15, 1);
}
</style>