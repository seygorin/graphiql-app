import { FirestoreError, addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { errorNotifyMessage } from './notifyMessage';

interface SaveToHistoryParams {
  method: string;
  url: string;
  requestBody?: string;
  headers: string;
  variables?: string;
}

export const saveToHistoryFirestore = async (
  { method, url, requestBody, headers, variables }: SaveToHistoryParams,
  userUid: string,
  t: (key: string) => string,
) => {
  try {
    const historyCollection = collection(db, 'requestHistory');
    const timestamp = new Date().getTime();

    const historyItem = {
      method,
      url,
      headers,
      variables,
      timestamp,
      userUid,

      ...(method !== 'GET' && method !== 'DELETE' && requestBody ? { requestBody } : {}),
    };

    await addDoc(historyCollection, historyItem);
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
