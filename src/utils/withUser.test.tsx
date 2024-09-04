import { useTranslations } from 'next-intl';
import { useAuthState } from 'react-firebase-hooks/auth';
import { render, screen, waitFor } from '@testing-library/react';
import { User } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { afterEach, beforeEach, describe, expect, it, test, vi } from 'vitest';
import { errorNotifyMessage } from 'utils/notifyMessage';
import withUser from './withUser';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  GoogleAuthProvider: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
  getAuth: vi.fn(),
  onIdTokenChanged: vi.fn((auth, callback) => {
    callback({ getIdTokenResult: vi.fn() });
    return () => {};
  }),
}));

vi.mock('utils/notifyMessage', () => ({
  errorNotifyMessage: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
}));

const MockComponent = ({ user, name }: { user?: User | null; name?: string | null }) => (
  <div>{user ? `User: ${name}` : 'No User'}</div>
);

const WrappedComponent = withUser(MockComponent);

describe('withUser HOC', () => {
  let user: User | null = null;
  const t = (key: string) => key;

  beforeEach(() => {
    (useTranslations as vi.Mock).mockReturnValue((key: string) => key);
    (collection as vi.Mock).mockReturnValue('users');
    (query as vi.Mock).mockReturnValue('query');
    (where as vi.Mock).mockReturnValue('where');
    (getDocs as vi.Mock).mockResolvedValue({
      docs: [{ data: () => ({ name: 'John Doe' }) }],
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders wrapped component with user and name', async () => {
    user = { uid: '123' } as User;
    (useAuthState as jest.Mock).mockReturnValue([user, false]);
    render(<WrappedComponent />);
    await screen.findByText('User: John Doe');
    expect(screen.getByText('User: John Doe')).toBeInTheDocument();
  });

  test('renders wrapped component with no user', () => {
    (useAuthState as jest.Mock).mockReturnValue([null, false]);
    render(<WrappedComponent />);
    expect(screen.getByText('No User')).toBeInTheDocument();
  });

  it('calls errorNotifyMessage when fetching user name fails', async () => {
    const userMock = { uid: '123' };
    vi.mocked(useAuthState).mockReturnValue([userMock, false, null]);
    vi.mocked(useTranslations).mockReturnValue(t);
    vi.mocked(query).mockReturnValue({});
    vi.mocked(collection).mockReturnValue({});
    vi.mocked(where).mockReturnValue({});
    vi.mocked(getDocs).mockRejectedValue(new Error('Database error'));
    render(<WrappedComponent />);
    await waitFor(() => {
      expect(errorNotifyMessage).toHaveBeenCalledWith(t('auth.error.database'));
    });
  });
});
