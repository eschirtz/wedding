<template>
  <SectionHero id="home" class="h-screen"/>
  <section id="the-story" class="py-40 px-4">
    <SectionHeader title="The Story"/>
    <StoryChapter class="observable" title="How they met" :story="[`It was the summer of 2015 when Hannah & a few of her friends hopped on Eric's boat. She was relatively new to
        the Lake Geneva area but Eric, born and raised on Geneva Lake, was able to show Hannah what #lakelife was all
        about.`, `Hannah caught on fairly quickly to wake-boarding, but Eric exhibited tremendous patience while teaching Hannah
        to wake-surf. It wasn't love at first sight, but it was the beginning of the rest of their lives.`]" />
  </section>

  <section id="destination" class="py-40">
    <SectionHeader title="The Destination"/>    
  </section>
  <section id="faq">
    <SectionHeader title="Questions?" class="py-40"/>
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import StoryChapter from '../components/StoryChapter.vue';
import SectionHeader from '../components/SectionHeader.vue';
import SectionHero from './SectionHero.vue';

const emit = defineEmits(['update:currentSection'])

onMounted(() => {
  console.log('Mounted Intersection Observer');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Handle navigation sections
        if (entry.isIntersecting && entry.target.tagName === 'SECTION' && entry.intersectionRatio >= 0.5) {
          emit('update:currentSection', entry.target.id)
        } else if (entry.intersectionRatio >= 0.5) {
          console.log('Intersecting', entry.target);          
          entry.target.classList.add('intersected');
        } else if(!entry.isIntersecting) {
          console.log('Invisible', entry.target);
          entry.target.classList.remove('intersected');
        }
      });
    }, 
    { threshold: [0, 0.5] }
  );
  // Grab all navigation sections
  document.querySelectorAll('section').forEach((section) => {    
    console.log('Observing', section);
    
    observer.observe(section);
  });
  // Grab all "observable" elements
  document.querySelectorAll('.observable').forEach((element) => {
    console.log('Observing', element);
    
    observer.observe(element);
  });
});

</script>