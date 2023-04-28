<template>
  <div class="view-margin mx-auto pt-8" v-if="!submitted">
    <h2 class="font-display text-black text-4xl mt-16 mb-6 mx-auto">
      I will not be attending
    </h2>
    <form class="text-left max-w-xs mx-auto" @submit.prevent @input="updateFields" >
      <TextInput label="Name *" name="name"  :value="name" class="mb-4" />
      <TextInput textarea label="Leave us a note" name="note" :value="note" class="mb-4 max-w-xs" />
      <BaseButton label="Confirm" @click="(e) => name ? onConfirm(e) : () => {}"  />
    </form>
  </div>
  <div class="view-margin mx-auto pt-8" v-else>
    <h2 class="font-display text-black text-4xl mt-16 mb-6 mx-auto">
      Thank you for letting us know!
    </h2>
    <p class="text-left max-w-xs mx-auto text-black/50">
      We're sorry you won't be able to make it, but we understand. We'll miss you!
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TextInput from '../components/TextInput.vue';
import BaseButton from '../components/BaseButton.vue';
import firebase from 'firebase/app';

const name = ref('');
const note = ref('');

const db = firebase.firestore();

const submitted = ref(false);

function updateFields(e: Event) {
  const target = e.target as HTMLInputElement;
  const field = target.name;
  const value = target.value;
  switch (field) {
    case 'name':
      name.value = value;
      break;
    case 'note':
      note.value = value;
      break;
  }
}

function onConfirm(e: Event) {  
  console.log('confirming');
  
  db.collection('declines').add({
    name: name.value,
    note: note.value,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
  submitted.value = true;
}


</script>

<style scoped>


</style>