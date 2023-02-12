<template>
  <form @submit.prevent @input="emit('update', $event, guest.id)" class="flex flex-col gap-2 py-6">
    <TextInput label="Name" name="name" placeholder="First Last" :value="guest.data().name" class="mb-4" />
    <TextInput label="Email" name="email" placeholder="example@email.com" :value="guest.data().email" class="mb-4" />
    <TextInput label="Notes" name="notes" placeholder="Allergies, accessibility requirements, shared room preferences, etc..." :value="guest.data().notes" class="mb-4" />
    <p v-if="confirmed">Confirmed!</p>
    <BaseButton v-if="removable" label="Remove guest" @click="emit('remove', guest.id)" />
  </form>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import firebase from 'firebase/app';
import BaseButton from './BaseButton.vue';
import TextInput from './TextInput.vue';

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