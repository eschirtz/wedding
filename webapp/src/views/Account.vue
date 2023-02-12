<template>
  <div class="flex">
    <BaseImage 
      src="eric-hannah-vertical.jpg" 
      lazy-src="eric-hannah-vertical-lazy.jpg" 
      class="h-screen w-1/2 lg:w-1/3 hidden md:block sticky top-0" 
      alt="Eric and Hannah looking very cool"
    />
    <div class="text-left p-6 view-margin grow">
      <div class="text-center">
        <h1 class="font-display text-black mb-2 text-6xl mx-auto">Reservation</h1>
        <p class="font-sans text-sm text-black/50 max-w-lg mx-auto mb-6">In order to make your
          trip as smooth as possible, please fill out info for you and any other guests in your party. You can update your info at any time.
        </p>
      </div>
      <Divider />
      <template v-for="(guest, count) of guests" :key="guest.id">
        <Guest
          :guest="guest"
          :confirmed="count < paymentsReceived"
          :removable="!guest.data().isSelf && paymentsReceived !== guests.length"
          @update="updateGuestInfo"
          @remove="removeGuest"
        />
        <Divider />
      </template>
      <div class="flex justify-between py-6">
        <BaseButton v-if="unconfirmedGuests" :label="`RSVP · $${(checkoutPriceAmount / 100).toFixed(0)}`"
          @click="onCheckout" />
        <span v-if="checkoutLoading">Loading...</span>
        <BaseButton label="Add Guest" @click="addGuest()" />
      </div>
      <Divider />
      <BaseButton label="Logout" @click="logout" class="my-6" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import BaseImage from '../components/BaseImage.vue';
import Divider from '../components/Divider.vue';
import Guest from '../components/Guest.vue';
import { currentUser, db, auth, payForGuests, paymentStatusKnown, paymentsReceived, priceAmount } from '../plugins/firebase';
import router from '../plugins/router';
import firebase from 'firebase/app';

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

function addGuest(name?: string, email?: string, isSelf?: boolean) {
  const guestsRef = getGuestsRef();
  guestsRef.add({
    name: name ?? '',
    email: email ?? '',
    isSelf: isSelf ?? false,
    timeCreated: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

function addSelfAsGuest() {
  addGuest(
    currentUser.value?.displayName ?? undefined,
    currentUser.value?.email ?? undefined,
    true
  );
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
    guests.value = snapshot.docs.sort((a, b) => {
      const aTime = a.data()?.timeCreated as firebase.firestore.Timestamp;
      const bTime = b.data()?.timeCreated as firebase.firestore.Timestamp;
      return (aTime?.toMillis() ?? Number.MAX_SAFE_INTEGER) - (bTime?.toMillis() ?? Number.MAX_SAFE_INTEGER);
    });
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