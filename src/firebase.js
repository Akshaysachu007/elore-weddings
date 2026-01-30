import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCN37im2IVVQGsN2u8y0RoDXZGysrN2wY0",
  authDomain: "elore-weddings.firebaseapp.com",
  projectId: "elore-weddings",
  storageBucket: "elore-weddings.firebasestorage.app",
  messagingSenderId: "726596928999",
  appId: "1:726596928999:web:f046639d8cf89890a76942",
  measurementId: "G-PEC73LCDD0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);