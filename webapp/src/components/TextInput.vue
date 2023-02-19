<template>
  <div>
  <label :for="name" class="block text-sm font-medium text-black/50">{{ label }}</label>
  <div class="relative mt-1 rounded-md shadow-sm">
    <input type="text" :placeholder="placeholder" :name="name" :value="value" class="block w-full rounded-md border border-black/25 py-2 px-3 focus:border-amber-500 focus:ring-amber-500 sm:text-sm placeholder-gray-400" />
  </div>
</div>  
</template>

<script lang="ts" setup>
  defineProps({
    label: String,
    value: String,
    name: String,
    placeholder: String,
  });

  defineEmits({

  });
</script>
<style scoped>

</style>