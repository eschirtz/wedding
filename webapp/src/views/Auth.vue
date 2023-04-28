<template>
  <div class="flex mx-auto">
    <BaseImage src="eric-hannah-vertical.jpg" lazy-src="eric-hannah-vertical-lazy.jpg"
      class="h-screen w-1/2 hidden md:block" alt="Eric and Hannah looking very cool" />
    <div class="grow view-margin p-4">
      <h2 class="font-display text-black text-6xl mt-16 mb-4 mx-auto">
        RSVP
      </h2>
      <p class="font-sans text-sm text-black/50 max-w-md mx-auto mb-8">
        Signing in allows us to manage all of the accommodations we'll be booking for you.
      </p>
      <div v-show="(authStateKnown && !currentUser)" id="firebaseui-auth-container" class="mx-auto" />
      <div>
        <h3 class="mb-4 text-black/75">or</h3>
        <BaseButton class="mx-auto text-black/50 hover:text-black/75 border-none text-sm" @click="router.push('/rsvp/decline')" label="I will not be attending" />
      </div>
      <HelpChip class="mt-8" />
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
import BaseButton from "../components/BaseButton.vue";

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
<style scoped></style>