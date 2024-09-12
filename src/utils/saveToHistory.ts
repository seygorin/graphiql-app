import {
  CollectionReference,
  FirestoreError,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { errorNotifyMessage } from 'utils/notifyMessage';
import { db } from '../lib/firebase';
import { TFunction } from '../validations/signInValidation.schema';

interface HistoryItem {
  method: string;
  url: string;
  requestBody?: string;
  headers?: string;
  variables?: string;
  sdlUrl?: string;
}

interface HistoryCollectionItem {
  headers?: string;
  id: string;
  method: string;
  requestBody?: string;
  timestamp: number;
  url: string;
  userUid: string;
  variables?: string;
  sdlUrl?: string;
}

export const saveToHistoryFirestore = async (
  requestData: HistoryItem,
  userUid: string,
  t: TFunction,
) => {
  try {
    const historyCollection = collection(
      db,
      'requestHistory',
    ) as CollectionReference<HistoryCollectionItem>;

    await addDoc(historyCollection, {
      ...requestData,
      id: Date.now().toString(),
      timestamp: Date.now(),
      userUid,
    });

    const q = query(
      historyCollection,
      where('userUid', '==', userUid),
      orderBy('timestamp', 'desc'),
      limit(51),
    );
    const querySnapshot = await getDocs(q);

    const docsToDelete: string[] = [];
    querySnapshot.docs.forEach((data, index) => {
      if (index >= 50) {
        docsToDelete.push(data.id);
      }
    });
    await Promise.all(docsToDelete.map((docId) => deleteDoc(doc(db, 'requestHistory', docId))));
  } catch (err) {
    if (err instanceof FirestoreError) {
      errorNotifyMessage(t('firestore.error.firestoreSave'));
    } else if (err instanceof Error) {
      errorNotifyMessage(err.message);
    } else {
      errorNotifyMessage(t('firestore.error.unknown'));
    }
  }
};
