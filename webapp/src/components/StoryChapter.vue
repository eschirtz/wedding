<template>
  <div 
    class="flex flex-col lg:flex-row gap-12 justify-items-center items-center max-w-6xl mx-auto"
    :class="[active ? 'intersected' : '']"
  >
    <slot :bind="{ active: active }"></slot>
    <div class="writeup text-left">
      <h4 class="font-display text-4xl mb-6">{{ title }}</h4>
      <p class="font-body text-lg text-black/50">
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
defineProps({
  active: Boolean,
  title: String,
  story: Array as () => string[]  
});
</script>

<style scoped>
.writeup {
  opacity: 0;
  transition-property: opacity, transform;
  transition-duration: 1s;
  transition-delay: 0;
  transition-timing-function: ease-out;
  transform: translateY(32px);
}

.intersected .writeup {
  opacity: 100%;
  transform: translateY(0);
  transition-delay: 0.5s;
}
</style>