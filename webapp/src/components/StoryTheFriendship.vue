<template>
  <div class="flex w-full max-w-md">
    <BaseImage style="width: 100%; height: 372px" src="hannah-surf.jpg" lazy-src="hannah-surf-lazy.jpg"
      class="rounded shadow hannah-surf" />
    <BaseImage style="width: 100%; height: 372px" src="eric-surf.jpg" lazy-src="eric-surf-lazy.jpg"
      class="rounded shadow eric-surf" />
  </div>
</template>

<script lang="ts" setup>
import BaseImage from '@/components/BaseImage.vue';

defineProps({ 
  active: Boolean
});

</script>

<style scoped>


</style>