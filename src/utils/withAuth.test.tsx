import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ROUTES from '../shared/types/types';
import withAuth from './withAuth';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  onIdTokenChanged: vi.fn(),
  auth: {},
}));

vi.mock('components/Loader', () => ({
  default: () => <div data-testid='loader'>Loader</div>,
}));

vi.mock('../lib/auth', () => ({
  signOutUser: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  GoogleAuthProvider: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
  getAuth: vi.fn(),
  onIdTokenChanged: vi.fn((auth, callback) => {
    callback({
      getIdTokenResult: vi.fn().mockResolvedValue({
        expirationTime: new Date(Date.now() + 5000).toISOString(),
      }),
    });
    return () => {};
  }),
}));

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
  NextIntlClientProvider: ({ children }) => children,
}));

const MockComponent = () => <div data-testid='mock-component'>Mock Component</div>;

const messages = {
  'form.title.signIn': 'Sign In',
  'form.email': 'Email',
  'form.password': 'Password',
  'form.button.signIn': 'Sign In',
};

describe('withAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useTranslations as vi.Mock).mockReturnValue((key: string) => key);
  });

  it('should render Loader when loading', () => {
    (useAuthState as vi.Mock).mockReturnValue([null, true]);
    const WrappedComponent = withAuth(MockComponent);
    render(
      <NextIntlClientProvider locale='en' messages={messages}>
        <WrappedComponent />
      </NextIntlClientProvider>,
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should redirect to MAIN_PAGE when user is not authenticated', async () => {
    (useAuthState as vi.Mock).mockReturnValue([null, false]);
    const pushMock = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({ replace: pushMock });
    const WrappedComponent = withAuth(MockComponent);
    render(
      <NextIntlClientProvider locale='en' messages={messages}>
        <WrappedComponent />
      </NextIntlClientProvider>,
    );
    await waitFor(() => expect(pushMock).toHaveBeenCalledWith(ROUTES.MAIN_PAGE));
  });

  it('should render the wrapped component when user is authenticated', () => {
    (useAuthState as vi.Mock).mockReturnValue([{ uid: '123' }, false]);
    const WrappedComponent = withAuth(MockComponent);
    render(
      <NextIntlClientProvider locale='en' messages={messages}>
        <WrappedComponent />
      </NextIntlClientProvider>,
    );
    expect(screen.getByTestId('mock-component')).toBeInTheDocument();
  });
});
