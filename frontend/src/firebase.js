// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // Importing Firebase Auth
import {getFirestore} from 'firebase/firestore';
import {getStorage}from 'firebase/storage'

// console.log("Firebase API Key:", import.meta.env.VITE_API_KEY); // Debugging
// console.log("Firebase Auth Domain:", import.meta.env.VITE_AUTH_DOMAIN); // Debugging

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,  // Reference environment variables
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { auth, app, db, storage };  // Exporting 'auth' so it can be used in other files

export default app;


