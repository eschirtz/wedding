<template>
  <Icon :icon="icon" :width="width ?? defaultSize" :height="height ?? defaultSize" />
</template>

<script lang="ts" setup>
  import { Icon } from '@iconify/vue';

  const defaultSize = '24px';

  defineProps({
    icon: String,
    width: String,
    height: String
  });
</script>
<style scoped>

</style>