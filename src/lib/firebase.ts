/**
 * https://github.com/firebase/firebase-js-sdk/issues/8436
 */
// // Save the original console.log function
// const originalConsoleLog = console.log;
//
// console.log = function(...args) {
// // Check if the log message contains the word "heartbeats"
//   if (args.some(arg => typeof arg === 'string' && arg.includes('heartbeats'))) {
//     return; // Skip the log message
//   }
//
// // Otherwise, use the original console.log
//   originalConsoleLog.apply(console, args);
// };
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
