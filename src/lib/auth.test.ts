import { FirebaseError } from 'firebase/app';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  errorNotifyMessage,
  successNotifyMessage,
  warningNotifyMessage,
} from 'utils/notifyMessage';
import { signInUser, signInWithGoogle, signOutUser, signUpUser } from './auth';
import { auth } from './firebase';

vi.mock('firebase/auth', () => ({
  GoogleAuthProvider: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
  getAuth: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  addDoc: vi.fn(),
  collection: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  getFirestore: vi.fn(),
}));

vi.mock('utils/notifyMessage', () => ({
  errorNotifyMessage: vi.fn(),
  successNotifyMessage: vi.fn(),
  warningNotifyMessage: vi.fn(),
}));

describe('Authentication Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('signInWithGoogle', () => {
    it('should sign in with Google and add user to Firestore if not exists', async () => {
      const mockUser = { uid: '123', displayName: 'Test User', email: 'test@example.com' };
      const mockRes = { user: mockUser };
      const mockCollectionRef = {};

      (signInWithPopup as vi.Mock).mockResolvedValue(mockRes);
      (getDocs as vi.Mock).mockResolvedValue({ docs: [] });
      (collection as vi.Mock).mockReturnValue(mockCollectionRef);

      const t = vi.fn((key: string) => key);
      await signInWithGoogle(t);
      expect(signInWithPopup).toHaveBeenCalledWith(auth, expect.any(GoogleAuthProvider));
      expect(addDoc).toHaveBeenCalledWith(mockCollectionRef, {
        uid: mockUser.uid,
        name: mockUser.displayName,
        authProvider: 'google',
        email: mockUser.email,
      });
      expect(successNotifyMessage).toHaveBeenCalledWith(t('auth.success.signinGoogle'));
    });

    it('should handle errors', async () => {
      const error = new Error('auth.error.google');
      (signInWithPopup as vi.Mock).mockRejectedValue(error);
      const t = vi.fn((key: string) => key);
      await signInWithGoogle(t);
      expect(errorNotifyMessage).toHaveBeenCalledWith(t(error.message));
    });
  });

  describe('signUpUser', () => {
    it('should create a user with email and password', async () => {
      const mockUser = { uid: '123' };
      (createUserWithEmailAndPassword as vi.Mock).mockResolvedValue({ user: mockUser });
      const t = vi.fn((key: string) => key);

      await signUpUser('Test User', 'test@example.com', 'password', t);

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'test@example.com',
        'password',
      );
      expect(addDoc).toHaveBeenCalledWith(expect.any(Object), {
        uid: mockUser.uid,
        name: 'Test User',
        authProvider: 'local',
        email: 'test@example.com',
      });
      expect(successNotifyMessage).toHaveBeenCalledWith(t('auth.success.signup'));
    });

    it('should handle errors', async () => {
      const error = new Error('auth.error.signup.failed');
      (createUserWithEmailAndPassword as vi.Mock).mockRejectedValue(error);
      const t = vi.fn((key: string) => key);
      await signUpUser('Test User', 'test@example.com', 'password', t);

      expect(errorNotifyMessage).toHaveBeenCalledWith(t(error.message));
    });

    it('should call warningNotifyMessage when email is already in use', async () => {
      const mockError = new FirebaseError('auth/email-already-in-use', 'Email already in use');
      vi.mocked(createUserWithEmailAndPassword).mockRejectedValue(mockError);
      const t = (key: string) => key;
      await signUpUser('John Doe', 'test@example.com', 'password123', t);

      expect(warningNotifyMessage).toHaveBeenCalledWith(t('auth.error.signup.userExists'));
      expect(errorNotifyMessage).not.toHaveBeenCalled();
    });

    it('should call errorNotifyMessage for other errors', async () => {
      const mockError = new Error('Some other error');
      vi.mocked(createUserWithEmailAndPassword).mockRejectedValue(mockError);
      const t = (key: string) => key;
      await signUpUser('John Doe', 'test@example.com', 'password123', t);

      expect(errorNotifyMessage).toHaveBeenCalledWith(mockError.message);
      expect(warningNotifyMessage).not.toHaveBeenCalled();
    });
  });

  describe('signInUser', () => {
    it('should sign in a user with email and password', async () => {
      (signInWithEmailAndPassword as vi.Mock).mockResolvedValue({});
      const t = vi.fn((key: string) => key);
      await signInUser('test@example.com', 'password', t);

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password');
      expect(successNotifyMessage).toHaveBeenCalledWith(t('auth.success.signin'));
    });

    it('should handle errors', async () => {
      const error = new Error('auth.error.signin');
      (signInWithEmailAndPassword as vi.Mock).mockRejectedValue(error);
      const t = vi.fn((key: string) => key);
      await signInUser('test@example.com', 'password', t);

      expect(errorNotifyMessage).toHaveBeenCalledWith(t(error.message));
    });

    it('should call warningNotifyMessage when invalid credentials are used', async () => {
      const mockError = new FirebaseError('auth/invalid-credential', 'Invalid credential');
      vi.mocked(signInWithEmailAndPassword).mockRejectedValue(mockError);
      const t = (key: string) => key;
      await signInUser('test@example.com', 'password123', t);

      expect(warningNotifyMessage).toHaveBeenCalledWith(t('auth.error.signin'));
      expect(errorNotifyMessage).not.toHaveBeenCalled();
    });
  });

  describe('signOutUser', () => {
    it('should sign out a user', async () => {
      (signOut as vi.Mock).mockResolvedValue({});
      const t = vi.fn((key: string) => key);
      await signOutUser(t);

      expect(signOut).toHaveBeenCalledWith(auth);
      expect(warningNotifyMessage).toHaveBeenCalledWith(t('auth.success.signout'));
    });

    it('should handle errors', async () => {
      const error = new Error('auth.error.unknown');
      (signOut as vi.Mock).mockRejectedValue(error);
      const t = vi.fn((key: string) => key);
      await signOutUser(t);

      expect(errorNotifyMessage).toHaveBeenCalledWith(t(error.message));
    });
  });

  it('should not throw an error if a valid user is returned', async () => {
    const mockUser = { uid: '123', displayName: 'Test User', email: 'test@example.com' };
    const mockRes = { user: mockUser };
    const t = vi.fn((key: string) => key);
    (signInWithPopup as vi.Mock).mockResolvedValueOnce(mockRes);
    await signInWithGoogle(t);

    expect(signInWithPopup).toHaveBeenCalledWith(auth, expect.any(GoogleAuthProvider));
    expect(errorNotifyMessage).not.toHaveBeenCalled();
  });
});
