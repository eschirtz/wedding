<template>
  <form @submit.prevent @input="emit('update', $event, guest.id)" class="flex flex-col gap-2 py-6">
    <input placeholder="Name" name="name" :value="guest.data().name" />
    <input placeholder="Email" name="email" :value="guest.data().email" />
    <input placeholder="Notes" name="notes" :value="guest.data().notes" />
    <p v-if="confirmed">Confirmed!</p>
    <BaseButton v-if="removable" label="Remove guest" @click="emit('remove', guest.id)" />
  </form>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import firebase from 'firebase/app';
import BaseButton from './BaseButton.vue';

defineProps({
  guest: {
    type: Object as PropType<firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>>,
    required: true,
  },
  confirmed: Boolean,
  removable: Boolean,
});

const emit = defineEmits({
  'update': (Event, string) => true,
  'remove': (string) => true,
});
</script>
<style scoped>

</style>