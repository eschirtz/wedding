<template>
  <div class="view-margin">
    <p class="mb-4">
      {{ priceId }} {{ priceAmount }}
    </p>
    <input placeholder="Number of guests" v-model="quantity" />
    <BaseButton label="Checkout" @click="onCheckout" />
    <BaseButton label="Logout" @click="logout" />
    <span v-if="checkoutLoading">Loading...</span>
    <p>Paid for {{ paymentsReceived }} guests</p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import { currentUser, auth, payForGuests, paymentStatusKnown, paymentsReceived, priceAmount } from '../plugins/firebase';
import router from '../plugins/router';

defineProps({
  //
});

defineEmits({
  //
});

const priceId = ref<string>();
// const priceAmount = ref<number>();
const quantity = ref<number>(1);
const checkoutLoading = ref(false);

async function logout() {
  await auth.signOut();
  router.push('/');
}

async function onCheckout() {
  checkoutLoading.value = true;
  try {
    await payForGuests(quantity.value);
  } catch (error) {
    alert(error);
  } finally {
    checkoutLoading.value = false;
  }
}

onMounted(() => {
  // getPrices();
});
</script>

<style scoped>

</style>