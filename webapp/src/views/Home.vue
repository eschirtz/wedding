<template>
  <SectionHero id="home" class="h-screen"/>
  <section id="the-story" class="py-40 px-6">
    <SectionHeader title="The Story" class="mb-16 lg:mb-40"/>
    <StoryChapter 
      class="observable mb-12"
      id="how-they-met"
      :active="visibleIds['how-they-met']"
      title="How they met"
      :story="[`It was the summer of 2015 when Hannah & a few of her friends hopped on Eric's boat. She was relatively new to
        the Lake Geneva area but Eric, born and raised on Geneva Lake, was able to show Hannah what #lakelife was all
        about.`, `Hannah caught on fairly quickly to wake-boarding, but Eric exhibited tremendous patience while teaching Hannah
        to wake-surf. It wasn't love at first sight, but it was the beginning of the rest of their lives.`]">
        <template v-slot="{ bind: { active } }">
           <StoryHowTheyMet :active="active" />
        </template>
    </StoryChapter>
    <StoryChapter 
      class="observable"
      id="the-friendship"
      :active="visibleIds['the-friendship']"
      title="The friendship"
      :story="[`It was the summer of 2015 when Hannah & a few of her friends hopped on Eric's boat. She was relatively new to
        the Lake Geneva area but Eric, born and raised on Geneva Lake, was able to show Hannah what #lakelife was all
        about.`, `Hannah caught on fairly quickly to wake-boarding, but Eric exhibited tremendous patience while teaching Hannah
        to wake-surf. It wasn't love at first sight, but it was the beginning of the rest of their lives.`]">
        <template v-slot="{ bind: { active } }">
           <StoryHowTheyMet :active="active" />
        </template>
    </StoryChapter>
  </section>

  <section id="destination" class="py-40">
    <SectionHeader title="The Destination"/>    
  </section>
  <section id="faq">
    <SectionHeader title="Questions?" class="py-40"/>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import StoryChapter from '../components/StoryChapter.vue';
import SectionHeader from '../components/SectionHeader.vue';
import SectionHero from './SectionHero.vue';
import StoryHowTheyMet from '../components/StoryHowTheyMet.vue';

const emit = defineEmits(['update:currentSection']);

const visibleIds = reactive<{ [id: string]: boolean }>({});

onMounted(() => {
  const threshold = 0;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Handle navigation sections
        if (entry.isIntersecting && entry.target.tagName === 'SECTION') {
          emit('update:currentSection', entry.target.id)
        } else if (entry.isIntersecting) {
          visibleIds[entry.target.id] = true;          
        } else if(!entry.isIntersecting) {
          visibleIds[entry.target.id] = false;
        }
      });
    }, 
    { threshold: [0, threshold], rootMargin: '0px 0px -120px 0px' }
  );
  // Grab all navigation sections
  document.querySelectorAll('section').forEach((section) => {    
    observer.observe(section);
  });
  // Grab all "observable" elements
  document.querySelectorAll('.observable').forEach((element) => {
    observer.observe(element);
  });
});

</script>