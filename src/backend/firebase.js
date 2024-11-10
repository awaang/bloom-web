// firebase.js

import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCjklmcSFHCBjjSeovV5tUxBbGC6b4I8Hc",
  authDomain: "bloom-92818.firebaseapp.com",
  projectId: "bloom-92818",
  storageBucket: "bloom-92818.firebasestorage.app",
  messagingSenderId: "749341409637",
  appId: "1:749341409637:web:ba0c5b171600d43e83e18c",
  measurementId: "G-FRMV8EGYD6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
