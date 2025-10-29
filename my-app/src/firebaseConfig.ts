import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC8anNX_cq-cz2bfJbCOZiHeNwz1BkqA9E",
  authDomain: "newcivic-a44c4.firebaseapp.com",
  projectId: "newcivic-a44c4",
  storageBucket: "newcivic-a44c4.appspot.com", // Make sure this is correct and matches your bucket
  messagingSenderId: "742000197349",
  appId: "1:742000197349:web:a73778c8e2a6b491fc1e0c",
  measurementId: "G-4GF6PWE41H"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
