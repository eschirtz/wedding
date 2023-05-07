<template>
  <div class="view-margin">
    Guests
    <ul>
      <li v-for="guest in guests" class="mb-2">
        <RouterLink :to="`/users/${guest.id}`" :key="guest.id">
          {{ guest.data().email }}
        </RouterLink>
      </li>
    </ul>

  </div>
</template>

<script lang="ts" setup>
import firebase from 'firebase/app';
import { db } from '../plugins/firebase';
import { ref } from 'vue';

const guests = ref<firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]>([]);

db.collection('users').get().then((querySnapshot) => {
  guests.value = querySnapshot.docs;
});



defineProps({

});

defineEmits({

});
</script>
<style scoped></style>