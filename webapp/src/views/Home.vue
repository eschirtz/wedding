<template>
  <SectionHero id="home" class="h-screen"/>
  <section id="the-story" class="py-40">
    <SectionHeader title="The Story"/>
  </section>

  <section id="destination" class="py-40">
    <SectionHeader title="The Destination"/>
  </section>
  <section id="faq">
    <SectionHeader title="Questions?" class="py-40"/>
  </section>
</template>

<script lang="ts" setup>
import SectionHeader from '../components/SectionHeader.vue';
import SectionHero from './SectionHero.vue';

</script>
<style scoped>

</style>