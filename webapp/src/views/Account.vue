<template>
  <div class="view-margin">
    <h1 class="text-white text-6xl mb-12">
      {{ currentUser?.displayName }}
    </h1>
    <BaseButton label="Logout" @click="logout"/>
  </div>
</template>

<script lang="ts" setup>
import BaseButton from '../components/BaseButton.vue';
import { currentUser, auth } from '../plugins/firebase';
import router from '../plugins/router';

  defineProps({
    //
  });

  defineEmits({
    //
  });

  async function logout() {
    await auth.signOut();
    router.push('/');
  }
</script>

<style scoped>

</style>