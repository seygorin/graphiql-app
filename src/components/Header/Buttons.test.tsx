import { NextIntlClientProvider, useTranslations } from 'next-intl';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { User } from 'firebase/auth';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import Buttons, { IProps } from './Buttons';

vi.mock('utils/withUser', () => ({
  default: (Component: React.FC) => Component,
}));

vi.mock('firebase/auth', () => {
  return {
    getAuth: vi.fn(),
    signInWithEmailAndPassword: vi.fn(() => Promise.resolve()),
    GoogleAuthProvider: vi.fn(),
  };
});

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
  NextIntlClientProvider: ({ children }) => children,
}));

const messages = {
  'header.login': 'Sign In',
  'header.signUp': 'Sign Up',
  'header.logout': 'Sign Out',
};

describe('Buttons', () => {
  let user: User | null | undefined;
  let name: string | null | undefined;
  beforeEach(() => {
    (useTranslations as vi.Mock).mockReturnValue((key: string) => key);
    vi.mock('utils/withUser', () => ({
      default: (Component: React.FC<IProps>) => (props: IProps) => <Component {...props} />,
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders SignOutButton when user is authenticated', () => {
    user = { uid: '123' } as User;
    name = 'John Doe';
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Buttons user={user} name={name} />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText('header.logout')).toBeInTheDocument();
    expect(screen.queryByText('header.login')).not.toBeInTheDocument();
    expect(screen.queryByText('header.signUp')).not.toBeInTheDocument();
  });

  test('renders SignInButton and SignUpButton when user is not authenticated', () => {
    user = null;
    name = null;
    render(<Buttons user={user} name={name} />);

    expect(screen.getByText('header.login')).toBeInTheDocument();
    expect(screen.getByText('header.signUp')).toBeInTheDocument();
    expect(screen.queryByText('header.logout')).not.toBeInTheDocument();
  });
});
