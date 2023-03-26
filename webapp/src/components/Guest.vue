<template>
  <div class="px-4">
    <div class="py-6 flex items-center justify-between cursor-pointer" @click.prevent="open = !open">
      <span class="flex items-center gap-2">
        <h2 class="text-xl font-bold">
          {{ guest.data().name || 'New guest' }}
        </h2>
        <Icon v-if="confirmed" icon="mdi:check-decagram" width="16px" height="16px" />
      </span>
      <Icon :icon="open ? 'mdi:chevron-down' : 'mdi:chevron-right'" width="18px" height="18px" />
    </div>
    <div v-if="open" class="pb-4">
      <form @submit.prevent @input="emit('update', $event, guest.id)" class="flex flex-col gap-2">
        <TextInput label="Name *" name="name" placeholder="First Last" :value="guest.data().name" class="mb-4 max-w-xs" />
        <TextInput label="Email *" name="email" placeholder="example@email.com" :value="guest.data().email"
          class="mb-4 max-w-xs" />
        <TextInput label="Flight info" name="flight" placeholder="AA 774 (You can add this later)"
          :value="guest.data().flight" class="mb-4 max-w-xs" />
        <TextInput textarea label="Notes" name="notes" placeholder="Allergies, accessibility requirements, etc."
          :value="guest.data().notes" class="mb-4 max-w-md" />
        <div class="flex items-center">
          <Icon :icon="confirmed ? 'mdi:check-decagram' : 'mdi:alert-circle-outline'" width="16px" height="16px" />
          <span class="ml-2 text font-medium text-black/75">{{ confirmed ? 'Confirmed' : 'Unconfirmed' }}</span>
        </div>
        <p class="text-sm text-black/50">{{
          confirmed ?
          "Payment received, we'll see you in Scotland!" : "Confirmation will be complete after payment" }}</p>
      </form>
      <BaseButton v-if="removable" label="Remove guest" icon="mdi:delete" @click="emit('remove', guest.id)" @submit.prevent class="mt-4" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue';
import firebase from 'firebase/app';
import BaseButton from './BaseButton.vue';
import TextInput from './TextInput.vue';
import Icon from './Icon.vue';

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

const open = ref(true);

</script>
<style scoped></style>