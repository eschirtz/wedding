<template>
  <div class="flex">
    <BaseImage 
      src="eric-hannah-vertical.jpg" 
      lazy-src="eric-hannah-vertical-lazy.jpg" 
      class="h-screen w-1/2 hidden md:block" 
      alt="Eric and Hannah looking very cool"
    />
    <div class="grow view-margin p-4">
      <h2 class="font-display text-black text-6xl mt-16 mb-4 mx-auto">
        Sign in
      </h2>
      <p class="font-sans text-sm text-black/50 max-w-md mx-auto mb-8">
        This allows us to manage your RSVP and all accommodations that we'll be booking for you.
      </p>
      <div v-show="(authStateKnown && !currentUser)" id="firebaseui-auth-container" class="mx-auto mb-8" />
      <HelpChip />
    </div>
  </div>
</template>

<script lang="ts" setup>
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { onMounted, watchEffect } from "vue";
import BaseImage from "../components/BaseImage.vue";
import HelpChip from "../components/HelpChip.vue";
import { currentUser, authStateKnown } from "../plugins/firebase";
import router from "../plugins/router";

watchEffect(() => {
  if (currentUser.value) {
    router.push('/account');
  }
});

defineProps({

});

defineEmits({

});

const ui =
  firebaseui.auth.AuthUI.getInstance() ||
  new firebaseui.auth.AuthUI(firebase.auth());
const uiConfig: firebaseui.auth.Config = {
  autoUpgradeAnonymousUsers: true,
  signInSuccessUrl: '/account',
  signInOptions: [
    {
      fullLabel: `Continue with Google`,
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      customParameters: {
        // Forces account selection even when one account is available
        prompt: "select_account"
      }
    },
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      fullLabel: `Continue with Email`,
    }
  ],
  callbacks: {
    // signInFailure callback must be provided to handle merge conflicts which
    // occur when an existing credential is linked to an anonymous user.
    signInFailure: error => {
      console.error(error.message);
    }
  }
}

onMounted(() => {
  ui.start("#firebaseui-auth-container", uiConfig);
})


</script>
<style scoped>

</style>