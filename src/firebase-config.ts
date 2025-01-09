import { initializeApp } from "firebase/app";
import { getFirestore}from 'firebase/firestore'
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGE_SENDING_ID, APP_ID, MEASUREMENT_ID } from './config';



export const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGE_SENDING_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);