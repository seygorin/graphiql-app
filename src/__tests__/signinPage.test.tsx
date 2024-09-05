import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SignInPage from '../app/[locale]/(auth)/signin/page';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
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

vi.mock('components/ProtectedAuthRoute', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('SignInPage', () => {
  const mockPush = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    (useTranslations as vi.Mock).mockReturnValue((key: string) => key);
    (useRouter as vi.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('renders the SignInForm when user is not authenticated', () => {
    (useAuthState as vi.Mock).mockReturnValue([null, false]);
    render(<SignInPage />);
    expect(screen.getByText('form.title.signIn')).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
