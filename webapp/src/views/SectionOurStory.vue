<template>
  <div class="wrapper">
    <BaseImage class="box a" :src="photo2560w" :lazy-src="photo16w"/>
    <BaseImage class="box b" :src="photo2560w" :lazy-src="photo16w"/>
    <BaseImage class="box c" :src="photo2560w" :lazy-src="photo16w"/>
    <BaseImage class="box d" :src="photo2560w" :lazy-src="photo16w"/>
  </div>
</template>

<script lang="ts" setup>
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
.wrapper {
    display: grid;    
    height: 512px;
    width: 100%;
  }

  .a {
    grid-column: 1 / 3;
    grid-row: 1;
  }
  .b {
    grid-column: 3 ;
    grid-row: 1 / 3;
  }
  .c {
    grid-column: 1 ;
    grid-row: 2 ;
  }
  .d {
    grid-column: 2;
    grid-row: 2;
  }
</style>