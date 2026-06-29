/*
 * Firebase client SDK — for browser-side usage only (sign-in flow, listening
 * to Firestore changes from member-side UI, etc.). Never use Admin SDK here.
 *
 * The `NEXT_PUBLIC_*` keys are intentionally exposed to the client bundle;
 * security comes from Firestore Security Rules and the server-side gate, not
 * from key obscurity. See ARCHITECTURE.md section 9.
 */

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let cachedApp: FirebaseApp | undefined;

function getFirebaseApp(): FirebaseApp {
  if (cachedApp) return cachedApp;
  cachedApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return cachedApp;
}

export function firebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}

export function firebaseDb(): Firestore {
  return getFirestore(getFirebaseApp());
}

export function firebaseStorage(): FirebaseStorage {
  return getStorage(getFirebaseApp());
}
