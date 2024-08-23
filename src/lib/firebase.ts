import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB1WVLU-KuOz09ztkpmd7rPTxTUDpbl9UM',
  authDomain: 'rest-graphiql-client-466df.firebaseapp.com',
  projectId: 'rest-graphiql-client-466df',
  storageBucket: 'rest-graphiql-client-466df.appspot.com',
  messagingSenderId: '818361255465',
  appId: '1:818361255465:web:9b60429c12520fc533fe38',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
