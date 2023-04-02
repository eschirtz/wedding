<template>
  <Transition
    enter-active-class="transition-class duration-500"
    enter-from-class="!opacity-0 -translate-y-16"      
    leave-active-class="transition-class duration-500"
    leave-to-class="!opacity-0 -translate-y-16"
  >
    <NavigationBar
      v-if="showNavigationBar"
      class="fixed top-0 left-0 right-0 z-40" 
      @toggle-menu="menu = !menu" 
      @scroll-to-top="scrollToTop"
      :routes="routes"
      :user="currentUser" 
      :active-route="currentSection"
      :show-background="scrolledPastThreshold"    
    />
  </Transition>
  <Transition
    enter-active-class="transition-class duration-500"
    enter-from-class="!opacity-0 -translate-y-6"      
    leave-active-class="transition-class duration-500"
    leave-to-class="!opacity-0 -translate-y-6"
  >
    <MobileNavigationMenu 
      v-if="menu" 
      class="fixed top-0 left-0  bottom-0 right-0 z-50" 
      :routes="routes"
      active-route="Home"
      @toggle-menu="menu = !menu" 
      @click-outside="menu = false" 
    />
  </Transition>
  <RouterView @update:currentSection="updateCurrentSection" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import NavigationBar from "@/components/NavigationBar.vue";
import MobileNavigationMenu from '@/components/MobileNavigationMenu.vue'
import { RouteLocationRaw } from "vue-router";
import { currentUser } from './plugins/firebase';

const menu = ref(false);
const showNavigationBar = ref(true);
const scrolledPastThreshold = ref(false);
const currentSection = ref('');

const routes: { name: string, to: RouteLocationRaw }[] = [
  {
    name: "Home",
    to: { path: '/', hash: '#home' }
  },
  {
    name: "The Story",
    to: { path: '/', hash: '#the-story' }
  },
  {
    name: "The Destination",
    to: { path: '/', hash: '#destination' }
  },
  {
    name: "FAQ",
    to: { path: '/', hash: '#faq' }
  },
]

onMounted(() => {
  // Scrolling logic
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const goingDown = scrollTop > lastScrollTop;
    lastScrollTop = scrollTop;

    const threshold = 64;
    const backgroundThreshold = 128;
    
    if(goingDown && scrollTop > threshold) {
      showNavigationBar.value = false;
    } else {
      showNavigationBar.value = true;
    }
    
    scrolledPastThreshold.value = scrollTop > backgroundThreshold;
  });
});

// Intersection observer logic

function updateCurrentSection(section: string) {
  // @ts-ignore
  const route = routes.find((route) => route.to.hash === `#${section}`);
  if (route) {
    currentSection.value = route?.name;
  }  
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

</script>

<style scoped>
.transition-class {
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(.07,.31,.15,1);
}
</style>
