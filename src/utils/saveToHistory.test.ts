import { FirestoreError, addDoc } from 'firebase/firestore';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { errorNotifyMessage } from 'utils/notifyMessage';
import { saveToHistoryFirestore } from './saveToHistory';

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  addDoc: vi.fn(),
  updateDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  getDocs: vi.fn(),
  deleteDoc: vi.fn(),
  doc: vi.fn(),
  FirestoreError: vi.fn(),
}));

const t = vi.fn((key: string) => key);

vi.mock('../lib/firebase', () => ({
  db: {},
}));

vi.mock('utils/notifyMessage', () => ({
  errorNotifyMessage: vi.fn(),
  successNotifyMessage: vi.fn(),
}));

describe('saveToHistoryFirestore', () => {
  const userUid = 'userUid';
  const requestData = {
    method: 'POST',
    url: 'https://example.com',
    requestBody: 'some request body',
    headers: 'some headers',
    variables: 'some variables',
  };
  const docsArray = [];
  for (let i = 0; i <= 50; i += 1) {
    docsArray.push({ id: `doc${i}` });
  }

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  it('should handle FirestoreError correctly', async () => {
    (addDoc as vi.Mock).mockRejectedValue(new FirestoreError());
    await saveToHistoryFirestore(requestData, userUid, t);

    expect(errorNotifyMessage).toHaveBeenCalledWith('firestore.error.firestoreSave');
  });

  it('should handle generic Error correctly', async () => {
    (addDoc as vi.Mock).mockRejectedValue(new Error('Generic error'));
    await saveToHistoryFirestore(requestData, userUid, t);

    expect(errorNotifyMessage).toHaveBeenCalledWith('Generic error');
  });

  it('should handle unknown error correctly', async () => {
    const unknownError = { some: 'unknown error' };
    (addDoc as vi.Mock).mockRejectedValue(unknownError);
    await saveToHistoryFirestore(requestData, userUid, t);

    expect(errorNotifyMessage).toHaveBeenCalledWith('firestore.error.unknown');
  });
});
