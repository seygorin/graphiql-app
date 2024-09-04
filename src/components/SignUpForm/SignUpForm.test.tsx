import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { errorNotifyMessage } from 'utils/notifyMessage';
import { signUpUser } from '../../lib/auth';
import SignUpForm from './SignUpForm';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(),
}));

vi.mock('../../lib/auth', () => ({
  signUpUser: vi.fn(() => Promise.resolve()),
}));

vi.mock('../../utils/notifyMessage', () => ({
  errorNotifyMessage: vi.fn(),
}));

describe('SignUpForm', () => {
  beforeEach(() => {
    (useTranslations as vi.Mock).mockReturnValue((key: string) => key);

    (useForm as vi.Mock).mockReturnValue({
      register: vi.fn(),
      handleSubmit: vi.fn((onSubmit) => (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
          name: 'Test',
          email: 'test@example.com',
          password: 'Qw!2qwer',
          confirmPassword: 'Qw!2qwer',
        });
      }),
      reset: vi.fn(),
      formState: {
        errors: {},
        isValid: true,
      },
    });

    (signUpUser as vi.Mock).mockResolvedValue(true);
    (errorNotifyMessage as vi.Mock).mockImplementation(() => {});
  });

  it('renders the sign-up form', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText('form.name')).toBeInTheDocument();
    expect(screen.getByLabelText('form.email')).toBeInTheDocument();
    expect(screen.getByLabelText('form.password')).toBeInTheDocument();
    expect(screen.getByLabelText('form.confirmPassword')).toBeInTheDocument();
    expect(screen.getByText('form.button.signUp')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText('form.name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('form.email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('form.password'), { target: { value: 'Qw!2qwer' } });
    fireEvent.change(screen.getByLabelText('form.confirmPassword'), {
      target: { value: 'Qw!2qwer' },
    });

    fireEvent.click(screen.getByText('form.button.signUp'));

    await waitFor(() => {
      expect(signUpUser).toHaveBeenCalledWith(
        'Test',
        'test@example.com',
        'Qw!2qwer',
        expect.any(Function),
      );
    });
  });

  it('shows password visibility toggle functionality', () => {
    render(<SignUpForm />);
    const passwordInput = screen.getByLabelText('form.password');
    const visibilityButton = screen.getByRole('button', { name: /toggle password visibility/i });
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(visibilityButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('displays validation errors for invalid data', async () => {
    (useForm as vi.Mock).mockReturnValue({
      register: vi.fn(),
      handleSubmit: vi.fn((onSubmit) => (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name: '', email: '', password: '', confirmPassword: '' });
      }),
      reset: vi.fn(),
      formState: {
        errors: {
          name: { message: 'name error' },
          email: { message: 'email error' },
          password: { message: 'password error' },
          confirmPassword: { message: 'confirm password error' },
        },
        isValid: true,
      },
    });

    render(<SignUpForm />);

    fireEvent.click(screen.getByText('form.button.signUp'));

    await waitFor(() => {
      expect(screen.getByText('name error')).toBeInTheDocument();
      expect(screen.getByText('email error')).toBeInTheDocument();
      expect(screen.getByText('password error')).toBeInTheDocument();
      expect(screen.getByText('confirm password error')).toBeInTheDocument();
    });
  });

  it('should prevent default action on mouse down for password visibility toggle', () => {
    render(<SignUpForm />);

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

  it('should prevent default action on mouse down for confirm password visibility toggle', () => {
    render(<SignUpForm />);

    const confirmPasswordToggleButton = screen.getByLabelText('toggle confirmPassword visibility');
    const preventDefaultMock = vi.fn();

    const event = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    });

    Object.defineProperty(event, 'preventDefault', {
      value: preventDefaultMock,
      writable: false,
    });

    confirmPasswordToggleButton.dispatchEvent(event);
    expect(preventDefaultMock).toHaveBeenCalled();
  });

  it('should call errorNotifyMessage on signUpUser failure', async () => {
    const mockError = new Error('Sign up failed');
    signUpUser.mockRejectedValue(mockError);
    render(<SignUpForm />);

    fireEvent.change(screen.getByRole('textbox', { name: /name/i }), { target: { value: 'Test' } });
    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/form.password/i), { target: { value: 'Qw!2qwer' } });
    fireEvent.change(screen.getByLabelText(/form.confirmPassword/i), {
      target: { value: 'Qw!2qwer' },
    });

    fireEvent.click(screen.getByRole('button', { name: /form.button.signUp/i }));
    await waitFor(() => expect(errorNotifyMessage).toHaveBeenCalledWith('Sign up failed'));
  });
});
