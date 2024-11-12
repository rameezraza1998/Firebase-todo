import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoHXhdycNTKwomG8c5PvtVLbrnO9so-QU",
  authDomain: "todo-2684a.firebaseapp.com",
  projectId: "todo-2684a",
  storageBucket: "todo-2684a.firebasestorage.app",
  messagingSenderId: "922690801665",
  appId: "1:922690801665:web:58a27ea23e818240707000",
  measurementId: "G-TBZS89EKJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);