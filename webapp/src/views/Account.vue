<template>
  <div class="view-margin">
    <h1>Confirm your reservation</h1>
    <p>We can’t wait to have you join us in Scotland! In order to make your experience as smooth as possible, please
      fill out info for you and any other guests in your party.</p>
    <hr />
    <form v-for="(guest, count) of guests" :key="guest.id" class="flex flex-col gap-2 p-4" @submit.prevent
      @input="updateGuestInfo($event, guest.id)">
      <input placeholder="Name" name="name" :value="guest.data().name" />
      <input placeholder="Email" name="email" :value="guest.data().email" />
      <input placeholder="Notes" name="notes" :value="guest.data().notes" />
      <p v-if="count < paymentsReceived">Confirmed!</p>
      <BaseButton v-else label="Remove guest" @click="removeGuest(guest.id)" />
    </form>
    <hr />
    <div class="flex justify-between">
      <BaseButton v-if="unconfirmedGuests" :label="`RSVP · $${(checkoutPriceAmount / 100).toFixed(0)}`"
        @click="onCheckout" />
      <span v-if="checkoutLoading">Loading...</span>
      <BaseButton label="Add Guest" @click="addGuest" />
    </div>
    <hr />
    <BaseButton label="Logout" @click="logout" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import { currentUser, db, auth, payForGuests, paymentStatusKnown, paymentsReceived, priceAmount } from '../plugins/firebase';
import router from '../plugins/router';
import type firebase from 'firebase';

const quantity = ref<number>(1);
const checkoutLoading = ref(false);

async function logout() {
  await auth.signOut();
  router.push('/');
}

const guests = ref<firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]>([]);

function getGuestsRef() {
  const user = currentUser.value;
  if (!user) {
    alert('Something went wrong! (User not logged in). Text Eric at (262) 215-8990 for help')
    throw new Error('User not logged in');
  }
  return db.collection('users').doc(user.uid).collection('guests');
}

function addSelfAsGuest() {
  const guestsRef = getGuestsRef();
  guestsRef.add({
    name: currentUser.value?.displayName,
    email: currentUser.value?.email,
  });
}

function addGuest() {
  const guestsRef = getGuestsRef();
  guestsRef.add({
    name: '',
    email: '',
  });
}

function removeGuest(guestId: string) {
  const guestsRef = getGuestsRef();
  guestsRef.doc(guestId).delete();
}

const queuedGuestUpdates: {
  [guestId: string]: {
    /** The timeout handle for this update */
    timeout: number,
    /** The fields to update */
    fields: { [field: string]: string },
  }
} = {}

function saveGuestInfo(guestId: string, field: string, value: string) {
  const DEBOUNCE_TIME = 1000;
  // If there is already a queued update for this guest, clear it
  if (queuedGuestUpdates[guestId]) {
    console.log('clearing timeout');    
    clearTimeout(queuedGuestUpdates[guestId].timeout);
  }
  queuedGuestUpdates[guestId] = {
    // @ts-ignore
    timeout: setTimeout(() => {
      const guestsRef = getGuestsRef();
      guestsRef.doc(guestId).update(queuedGuestUpdates[guestId].fields);
      delete queuedGuestUpdates[guestId];
    }, DEBOUNCE_TIME),
    fields: {
      [field]: value,
    },
  };
}

/**
 * Takes the form data and updates the guest info in the database
 */
function updateGuestInfo(e: Event, guestId: string) {  
  const target = e.target as HTMLInputElement;
  const field = target.name;
  const value = target.value;
  saveGuestInfo(guestId, field, value);
}

function getGuestsForUser() {
  const user = currentUser.value;
  if (!user) {
    return;
  }
  const guestsRef = db.collection('users').doc(user.uid).collection('guests');
  guestsRef.onSnapshot((snapshot) => {
    guests.value = snapshot.docs;
    console.log(guests.value);
    if (guests.value.length === 0) addSelfAsGuest();
  });
}
getGuestsForUser();

const unconfirmedGuests = computed(() => {
  return guests.value.length - paymentsReceived.value;
});

const checkoutPriceAmount = computed(() => {
  return priceAmount.value * unconfirmedGuests.value;
});

async function onCheckout() {
  checkoutLoading.value = true;
  if (unconfirmedGuests.value === 0) {
    alert('You have already confirmed your reservation!');
    checkoutLoading.value = false;
    return;
  }
  try {
    await payForGuests(unconfirmedGuests.value);
  } catch (error) {
    alert(error);
  } finally {
    checkoutLoading.value = false;
  }
}

</script>

<style scoped>

</style>