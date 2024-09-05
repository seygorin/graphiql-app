import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SignUpPage from '../app/[locale]/(auth)/signup/page';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
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

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
  NextIntlClientProvider: ({ children }) => children,
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('components/Loader', () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));

describe('SignUpPage', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTranslations as vi.Mock).mockReturnValue((key: string) => key);
    (useRouter as vi.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('renders the SignUpForm when user is not authenticated', () => {
    (useAuthState as vi.Mock).mockReturnValue([null, false]);
    render(<SignUpPage />);
    expect(screen.getByText('form.title.signUp')).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('redirects to the main page when the user is authenticated', () => {
    (useAuthState as vi.Mock).mockReturnValue([{ uid: '123' }, false]);
    render(<SignUpPage />);
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('shows a loading state while checking authentication', () => {
    (useAuthState as vi.Mock).mockReturnValue([null, true]);
    render(<SignUpPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
