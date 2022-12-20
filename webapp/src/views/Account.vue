<template>
  <div class="view-margin">
    <h1 class="text-white text-6xl mb-4">
      {{ currentUser?.displayName }}
    </h1>
    <p class="text-white mb-4">
      {{ priceId }} {{ priceAmount }}
    </p>
    <input placeholder="Number of guests" v-model="quantity"/>
    <BaseButton label="Checkout" @click="onCheckout" />
    <BaseButton label="Logout" @click="logout"/>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import { currentUser, auth, db } from '../plugins/firebase';
import router from '../plugins/router';

  defineProps({
    //
  });

  defineEmits({
    //
  });

  const priceId = ref<string>();
  const priceAmount = ref<number>();
  const quantity = ref<number>(1);

  async function getPrices() {
    db.collection('products')
    .where('active', '==', true)
    .get()
    .then(snap => {
      snap.forEach(async doc => {
        const priceSnap = await doc.ref.collection('prices').where('active', '==', true).get();
        priceId.value = priceSnap.docs[0].id;
        priceSnap.docs.forEach((doc) => {
          priceAmount.value = doc.data().unit_amount;
        });
      });
    });
  }

  async function logout() {
    await auth.signOut();
    router.push('/');
  }

  async function onCheckout() {    
    const currentUser = auth.currentUser;
    if(!currentUser) return new Error('User not logged in');
    const docRef = await db
    .collection('guests')
    .doc(currentUser.uid)
    .collection("checkout_sessions")
    .add({
      mode: "payment",
      price: priceId.value,
      quantity: quantity.value,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });
    docRef.onSnapshot(snap => {
      console.log(snap.data());
      
    const { error, url } = snap.data() as {
      error: { message: string };
      url: string;
    };
    if (error) {
      // Show an error to your customer and
      // inspect your Cloud Function logs in the Firebase console.
      alert(`An error occured: ${error.message}`);
    }
    if (url) {
      window.location.assign(url);
    }
  });
  }

  onMounted(() => {
    getPrices();
  });
</script>

<style scoped>

</style>