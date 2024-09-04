import { NextIntlClientProvider, useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { errorNotifyMessage } from 'utils/notifyMessage';
import { signInUser } from '../../lib/auth';
import SignInForm from './SignInForm';

vi.mock('firebase/auth', () => {
  return {
    getAuth: vi.fn(),
    signInWithEmailAndPassword: vi.fn(() => Promise.resolve()),
    GoogleAuthProvider: vi.fn(),
  };
});

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(),
}));

vi.mock('../../lib/auth', () => ({
  signInUser: vi.fn(() => Promise.resolve()),
}));

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
  NextIntlClientProvider: ({ children }) => children,
}));

vi.mock('../../utils/notifyMessage', () => ({
  errorNotifyMessage: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const messages = {
  'form.title.signIn': 'Sign In',
  'form.email': 'Email',
  'form.password': 'Password',
  'form.button.signIn': 'Sign In',
};

describe('SignInForm', () => {
  beforeEach(() => {
    (useTranslations as vi.Mock).mockReturnValue((key: string) => key);

    (useForm as vi.Mock).mockReturnValue({
      register: vi.fn(),
      handleSubmit: vi.fn((onSubmit) => (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ email: 'test@example.com', password: 'Qw!2qwer' });
      }),
      reset: vi.fn(),
      formState: {
        errors: {},
        isValid: true,
      },
    });

    (signInUser as vi.Mock).mockResolvedValue(true);
    (errorNotifyMessage as vi.Mock).mockImplementation(() => {});
  });

  it('renders the sign-in form', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SignInForm />
      </NextIntlClientProvider>,
    );
    const emailLabel = screen.getByLabelText(/form.email/i);
    const emailInput = screen.getByRole('textbox', { name: /form.email/i });

    expect(emailLabel).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();

    const passwordLabel = screen.getByLabelText(/form.password/i);
    const passwordInput = screen.getByLabelText(/form.password/i);

    expect(passwordLabel).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    expect(screen.getByLabelText('form.email')).toBeInTheDocument();
    expect(screen.getByLabelText('form.password')).toBeInTheDocument();
    expect(screen.getByText('form.button.signIn')).toBeInTheDocument();
  });

  it('shows password visibility toggle functionality', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SignInForm />
      </NextIntlClientProvider>,
    );
    const passwordInput = screen.getByLabelText('form.password');
    const visibilityButton = screen.getByRole('button', { name: /toggle password visibility/i });
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(visibilityButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('displays validation errors for invalid data', async () => {
    (useForm as vi.Mock).mockReturnValue({
      register: vi.fn(),
      handleSubmit: vi.fn(),
      reset: vi.fn(),
      formState: {
        errors: {
          email: { message: 'email error' },
          password: { message: 'password error' },
        },
        isValid: false,
      },
    });
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SignInForm />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getByText('form.button.signIn'));

    await waitFor(() => {
      expect(screen.getByText('email error')).toBeInTheDocument();
      expect(screen.getByText('password error')).toBeInTheDocument();
    });
  });

  it('should prevent default action on mouse down for password visibility toggle', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SignInForm />
      </NextIntlClientProvider>,
    );

    const passwordToggleButton = screen.getByLabelText('toggle password visibility');
    const preventDefaultMock = vi.fn();

    const event = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    });

    Object.defineProperty(event, 'preventDefault', {
      value: preventDefaultMock,
      writable: false,
    });

    passwordToggleButton.dispatchEvent(event);
    expect(preventDefaultMock).toHaveBeenCalled();
  });

  it('should call errorNotifyMessage on signInUser failure', async () => {
    const mockError = new Error('Sign in failed');
    signInUser.mockRejectedValue(mockError);
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SignInForm />
      </NextIntlClientProvider>,
    );

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/form.password/i), { target: { value: 'Qw!2qwer' } });
    fireEvent.click(screen.getByRole('button', { name: /form.button.signIn/i }));
    await waitFor(() => expect(errorNotifyMessage).toHaveBeenCalledWith('Sign in failed'));
  });

  it('submits the form with valid data', async () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SignInForm />
      </NextIntlClientProvider>,
    );
    fireEvent.change(screen.getByLabelText('form.email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('form.password'), { target: { value: 'Qw!2qwer' } });
    fireEvent.click(screen.getByRole('button', { name: /form.button.signIn/i }));

    await waitFor(() => {
      expect(signInUser).toHaveBeenCalledWith('test@example.com', 'Qw!2qwer', expect.any(Function));
    });
  });
});
