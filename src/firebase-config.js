import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVl1mTysjuRSKxgV6UsVP6-uR9HvL5X-8",
  authDomain: "expense-tracker-99c82.firebaseapp.com",
  projectId: "expense-tracker-99c82",
  storageBucket: "expense-tracker-99c82.appspot.com",
  messagingSenderId: "466709854257",
  appId: "1:466709854257:web:6502e69f65896158ee3d10",
  measurementId: "G-P0295FPJEB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
