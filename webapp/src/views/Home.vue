<template>
  <SectionHero id="home" class="h-screen"/>
  <section id="the-story" class="pt-40 pb-0 px-6">
    <SectionHeader title="The Story" class="mb-32 lg:mb-40"/>
    <StoryChapter
      v-for="chapter in chapters" 
      class="observable mb-32 lg:mb-40"
      :id="chapter.id"
      :active="visibleIds[chapter.id]"
      :title="chapter.title"
      :story="chapter.story">
        <template v-slot="{ bind: { active } }">
           <Component :is="chapter.component" :active="active" />
        </template>
    </StoryChapter>
  </section>

  <section id="destination" class="px-6 mb-20 lg:mb-40">
    <BaseImage src="dundas-sketch.png" class="w-full h-32 lg:h-64 mb-8 lg:mb-12" contain />
    <SectionHeader title="The Destination" class="mb-8"/>    
    <p class="max-w-3xl mx-auto font-body text-black/50">
      Traveling has been a passion of Eric and Hannah's since they met; it was only fitting that they have a destination wedding. So why get married in a Scottish castle? No other reason than Hannah thought it would be cool to do.
      <br/><br/>
      Dundas Castle is located just 15 minutes from the Edinburgh airport. This three day party will take place on the beautiful grounds of Dundas, complete with tossing the highland games, pin-the-kilt on the sheep, and certainly some drinking.
    </p>
  </section>
  <div class="grid grid-cols-6 grid-rows-2 h-screen mb-20 lg:mb-40">
    <BaseImage class="col-span-3 lg:col-span-4" src="dundas-color.jpg" lazy-src="dundas-color-lazy.jpg" />
    <BaseImage class="col-span-3 lg:col-span-2" src="dundas-interior.jpg" lazy-src="dundas-interior-lazy.jpg" />
    <BaseImage class="col-span-6" src="edinburgh.jpg" lazy-src="edinburgh-lazy.jpg" />
  </div>

  <section id="accomodation" class="px-6 mb-20">
    <SectionHeader title="Accomodations" class="mb-8"/>    
    <p class="max-w-3xl mx-auto font-body text-black/50">
      You'll be staying in the beautiful Dakota hotel, just a 5 min ride (or 30 min walk) from Dundas castle. With your reservation, we'll be taking care of booking your room. You'll also be in a neighborhood that has Thing one, Thing two and Thing Three. 
      <br/><br/>
      The castle itself sleeps 40 and those rooms will primarily be for the bridal party and immediate family.
    </p>    
  </section>
  <div class="grid grid-cols-6 grid-rows-3 lg:grid-rows-2 h-screen">
    <BaseImage class="col-span-6 lg:col-span-3" src="dakota-1.jpg" lazy-src="dakota-1-lazy.jpg" />    
    <BaseImage class="col-span-6 lg:col-span-3 lg:row-span-2" src="bar.jpg" lazy-src="bar-lazy.jpg" />
    <BaseImage class="col-span-6 lg:col-span-3" src="dakota-2.jpg" lazy-src="dakota-2-lazy.jpg" />
  </div>

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
import StoryTheFriendship from "../components/StoryTheFriendship.vue";
import BaseImage from '../components/BaseImage.vue';

const emit = defineEmits(['update:currentSection']);

const visibleIds = reactive<{ [id: string]: boolean }>({});

const chapters: {id: string; component: object; title: string; story: string[]; }[] = [
  {
    id: 'how-they-met',
    title: 'How they met', 
    story: [`It was the summer of 2015 when Hannah & a few of her friends hopped on Eric's boat. She was relatively new to
        the Lake Geneva area but Eric, born and raised on Geneva Lake, was able to show Hannah what #lakelife was all
        about.`, `Hannah caught on fairly quickly to wake-boarding, but Eric exhibited tremendous patience while teaching Hannah
        to wake-surf. It wasn't love at first sight, but it was the beginning of the rest of their lives.`],
    component: StoryHowTheyMet
  },
  {
    id: 'the-friendship',
    title: 'The friendship', 
    story: [
      `Over the years, Eric and Hannah had a slow-growing friendship. They had a decent number of mutual friends, so they would frequently see each other around campus or at parties. Then towards the end of 2017, their friends decided to take a 3 week trip to Thailand. This trip was full of exploring, learning, laughing, and building friendships.`,
      `In 2018, Hannah was looking for a place to live her last semester of undergrad and, as luck would have it, Eric and his roommates had an extra spot. All of a sudden, Eric and Hannah became roomies where they stayed up late talking about life and inevitably becoming very close.`,
      `It wasn't until Hannah moved out of the apartment after she graduated that Eric told her how much he cared for her. At the time, Hannah said she didn't feel the same way, but it got her thinking about how well they got along; it didn't take long before she decided she felt the same way.`,
  ],
    component: StoryTheFriendship
  },
  {
    id: 'the-lovestory',
    title: 'The love story', 
    story: [
      `Once they started dating, their love grew quickly. It only took Eric about a month to tell Hannah he was in love with her, and luckily she said it back. A few months later, they took a trip to Europe with their friends where they experienced new cities and cultures together.`,
      `After half a year of long distance, they decided to move in together down in Arizona where Hannah was studying. Hannah would continue vet school while Eric worked remotely for the tech startup he founded. Their relationship was battle tested by the pandemic, multiple cross country road trips and adopting another amazing, but slightly crazy, dog. To their surprise, they also became fans of two-step dancing and country music.`,
  ],
    component: StoryTheFriendship
  },
  {
    id: 'the-engagement',
    title: 'The engagement', 
    story: [
      `When Eric and Hannah moved down to Phoenix, they didn't know what to expect. Would they golf everyday? Take up cactus gardening? While they didn't end up doing either of those, they did fall in love with a little place called the Roadrunner Saloon. This honky-tonk, bull-riding bar was a source of many fun Saturday nights. Eric and Hannah acquired the necessary attire and learned enough dance moves to be dangerous.`,
      `Eric decided to propose to Hannah here because he felt it embodied the idea that you love what you love, even if you don't see it coming. Just as he and Hannah didn't see each other romantically for years, they certainly couldn't have guessed they'd get engaged at a dusty bull-riding bar in the desert outside Phoenix, Arizona.`,
  ],
    component: StoryTheFriendship
  }
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Handle navigation sections
        if (entry.isIntersecting) {
          visibleIds[entry.target.id] = true;          
          emit('update:currentSection', entry.target.id);
        } else if(!entry.isIntersecting) {
          visibleIds[entry.target.id] = false;
        }
      });
    }, 
    { rootMargin: '0px 0px -120px 0px' }
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