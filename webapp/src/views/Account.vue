<template>
  <div class="flex">
    <BaseImage src="eric-hannah-vertical.jpg" lazy-src="eric-hannah-vertical-lazy.jpg"
      class="h-screen w-1/2 hidden md:block sticky top-0" alt="Eric and Hannah looking very cool" />
    <div class="text-left px-0 md:px-6 py-6 view-margin view grow">
      <div class="text-left px-4">
        <h1 class="font-display text-black mb-2 text-6xl ">Reservation</h1>
        <p class="font-sans text-sm text-black/50 mb-6">In order to make your
          trip as smooth as possible, please fill out info for you and any other guests in your party.
        </p>
      </div>
      <Divider />
      <template v-for="(guest, count) of guests" :key="guest.id">
        <Guest :guest="guest" :confirmed="count < paymentsReceived"
          :removable="!guest.data().isSelf && paymentsReceived !== guests.length" @update="updateGuestInfo"
          @remove="removeGuest" />
        <Divider />
      </template>
      <div @click="addGuest()" class="py-6 px-4 flex items-center cursor-pointer text-xl">
        <Icon icon="mdi:add" width="18px" height="18px" class="mr-4" /> Add another guest
      </div>
      <Divider />
      <div v-if="unconfirmedGuests" class="py-6 px-4">
        <p class="mb-2 text-md">{{ unconfirmedGuests  }} guest{{ unconfirmedGuests > 1 ? 's' : '' }} (${{ (priceAmount / 100).toFixed(0) }} / guest)</p>
        <p class="mb-4 text-md">Total: ${{ (checkoutPriceAmount / 100).toFixed(0) }}</p>
        <BaseButton label="Continue to payment" class="mb-2" @click="onCheckout" />
        <p class="text-sm text-black/50">Due to the logistical challenges of planning a wedding abroad, we won't be able to offer refunds after your payment has been submitted. Thank you for understanding!</p>
        <div class="loading-screen" v-if="checkoutLoading">
          <div class="mb-4 animate-bounce">
            <Icon icon="mdi:shield-lock" width="32px" height="32px"/>
          </div>
          <p>Redirecting to checkout...</p>
        </div>
        <p class="text-sm mt-4">{{currentUser?.email}} · <span class="underline cursor-pointer" @click="logout">Sign out</span></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import BaseImage from '../components/BaseImage.vue';
import Divider from '../components/Divider.vue';
import Icon from '../components/Icon.vue';
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
  }
}

</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  opacity: 0;
  animation: fade-in .5s ease-in-out forwards;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}


</style>