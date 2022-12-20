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
  authDomain: "eric-and-hannah.firebaseapp.com",
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

auth.onAuthStateChanged( user => {
  currentUser.value = user;
  authStateKnown.value = true;
})



