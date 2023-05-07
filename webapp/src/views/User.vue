<template>
  <div class="view-margin">
    <h2>{{ user?.data()?.email }}</h2>
    <h3 class="mt-8">Guests</h3>
    <ul>
      <li v-for="guest in guests" class="mb-2">
        <RouterLink :to="`/users/${guest.id}`" :key="guest.id">
          {{ guest.data().name }}, {{ guest.data().email }}
        </RouterLink>
      </li>
    </ul>
    <h3 class="mt-8">Payments</h3>
    <ul>
      <li v-for="payment in payments" class="mb-2">
        <RouterLink :to="`/users/${payment.id}`" :key="payment.id">
          {{ payment.data().amount }}, {{ payment.data().date }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import firebase from 'firebase/app';
import { db } from '../plugins/firebase';
import { ref } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const user = ref<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>();

db.collection('users').doc(props.id).get().then((querySnapshot) => {
  user.value = querySnapshot;
});

const guests = ref<firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]>([]);

db.collection('users').doc(props.id).collection('guests').get().then((querySnapshot) => {
  guests.value = querySnapshot.docs;
});

const payments = ref<firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]>([]);

db.collection('users').doc(props.id).collection('payments').get().then((querySnapshot) => {
  payments.value = querySnapshot.docs;
});


</script>
<style scoped></style>