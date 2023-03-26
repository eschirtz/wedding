// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { ref } from "vue";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4k-P-DNl7nxqAY1He1KoiyLLjr6raVUs",
  authDomain: "eric-and-hannah.web.app",
  projectId: "eric-and-hannah",
  storageBucket: "eric-and-hannah.appspot.com",
  messagingSenderId: "566555357423",
  appId: "1:566555357423:web:581588f228345fc3e1eb1a",
  measurementId: "G-ZRQFPVLZ48"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

export const authStateKnown = ref(false);
export const currentUser = ref<firebase.User | null>(null);

/** General logic for handling payments */

const PRICE_ID = "price_1MDvxwBDWgeikaYAYQyzbLxL";
const TEST_PRICE_ID = 'price_1MYDJoBDWgeikaYAI1YvW2o7';

const priceId = ref('');
export const priceAmount = ref(0);

const isTest = false;

function getPrice() {
  const productId = 'prod_Mxrh5falnKQFrb';
  db.collection('products').doc(productId).collection('prices').where('active', '==', true).get()
    .then(snap => {
      const priceSnap = snap.docs[0];      
      priceId.value = isTest ? TEST_PRICE_ID : priceSnap.id; // Override here so we can still test asynchronously
      priceAmount.value = priceSnap.data().unit_amount;
    });
}

getPrice(); // Immediately invoke

export const paymentStatusKnown = ref(false);
export const paymentsReceived = ref<number>(0);

export async function payForGuests(numberOfGuests: number) {
  if (!currentUser.value) return new Error('User not logged in');
  const docRef = await db
    .collection('users')
    .doc(currentUser.value.uid)
    .collection("checkout_sessions")
    .add({
      mode: "payment",
      price: priceId.value,
      quantity: numberOfGuests,
      success_url: window.location.href,
      cancel_url: window.location.href,
    });
  return new Promise<void>((resolve, reject) => {
    docRef.onSnapshot(snap => {
      const { error, url } = snap.data() as {
        error: { message: string };
        url: string;
      };
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        return reject(error.message);
      }
      if (url) {
        window.location.assign(url);
        return resolve();
      }
    });
  });
}

/**
 * Fetch list of payments for a user
 * @param uid 
 */
function getUserPayments(uid: string) {
  db.collection("users").doc(uid).collection("payments")
    .where("status", "==", 'succeeded').onSnapshot(snap => {
      paymentsReceived.value = snap.docs.reduce((acc, doc) => {
        const data = doc.data();
        const items = data.items;
        let quantity = 0;
        for (const item of items) {
          if (item.price.id === priceId.value) {
            quantity += item.quantity;
          }
        }
        return acc + quantity;        
      }, 0);
      const paymentAmountReceived = snap.docs.reduce((acc, doc) => {
        const data = doc.data();
        return acc + data.amount_received;
      }, 0);
      console.log("Payments received:", paymentsReceived.value);
      console.log("Payment amount received:", paymentAmountReceived);
    });
}

auth.onAuthStateChanged(user => {
  currentUser.value = user;
  authStateKnown.value = true;
  if (user) getUserPayments(user.uid);
});



