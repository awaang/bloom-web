// firebase.js

import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAHBGaiDLhUj2VUNG-6_279qakU5JUV5tY",
  authDomain: "bloom-4317b.firebaseapp.com",
  projectId: "bloom-4317b",
  storageBucket: "bloom-4317b.firebasestorage.app",
  messagingSenderId: "164159650573",
  appId: "1:164159650573:web:574b373177b6afc260ce44",
  measurementId: "G-96M7PD38B1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
