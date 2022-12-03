<template>
  <div class="view-margin">
    <div v-show="(authStateKnown && !currentUser)"  id="firebaseui-auth-container" />
  </div>
</template>

<script lang="ts" setup>
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { onMounted, watchEffect } from "vue";
import { currentUser, authStateKnown } from "../plugins/firebase";
import router from "../plugins/router";

watchEffect(() => {
  if(currentUser.value) {
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