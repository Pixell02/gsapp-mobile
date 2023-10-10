import { API_KEY, APP_ID, AUTH_DOMAIN, MEASUREMENT_ID, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET } from '@env';
import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
 apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

// init firebase
initializeApp(firebaseConfig);

// init firestore
const db = getFirestore();

const auth = getAuth();
export { auth, db };
