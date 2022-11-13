<script setup lang="ts">
import NavigationBar from "./components/NavigationBar.vue";
</script>

<template>
  <NavigationBar class="fixed top-0 left-0 right-0 z-40"/>
  <RouterView />
</template>

<style scoped>
</style>
