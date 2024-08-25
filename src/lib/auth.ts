import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './firebase';

const googleProvider = new GoogleAuthProvider();

/**
 * signInWithGoogle c try catch пока оставлен. Блок try/catch перенесен в комоненту SignInWithGoogle
 */

// export const signInWithGoogle = async () => {
//   try {
//     const res = await signInWithPopup(auth, googleProvider);
//     const user = res.user;
//     const q = query(collection(db, "users"), where("uid", "==", user.uid));
//     const docs = await getDocs(q);
//     if (docs.docs.length === 0) {
//       await addDoc(collection(db, "users"), {
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       });
//     }
//   } catch (err) {
//     if (err instanceof Error) {
//       console.error(err.message);
//     }
//   }
// };

export const signInWithGoogle = async () => {
  const res = await signInWithPopup(auth, googleProvider);
  const { user } = res;
  const q = query(collection(db, 'users'), where('uid', '==', user.uid));
  const docs = await getDocs(q);
  // in process
  if (!res || !user) {
    throw new Error('Google sign in failed');
  }
  //
  if (docs.docs.length === 0) {
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name: user.displayName,
      authProvider: 'google',
      email: user.email,
    });
  }
  // in process
  return user.uid;
  //
};

export const signUpUser = async (name: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = res;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
    }
  }
};

export const signInUser = async (email: string, password: string) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log('signInUser', user);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      //       // Set Error!!! "No such account found"
      //       console.log("No such account found")
    }
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error signing out:', err);
    }
  }
};

// export function onAuthStateChanged(callback: (authUser: User | null) => void) {
//   return _onAuthStateChanged(auth, callback);
// }
