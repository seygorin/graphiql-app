import { useTranslations } from 'next-intl';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SignInWithGoogle from 'components/SignInWithGoogle/SignInWithGoogle';
import { errorNotifyMessage } from 'utils/notifyMessage';
import { signInWithGoogle } from '../../lib/auth';

vi.mock('next/font/google', () => ({
  Roboto: () => ({
    style: {
      fontFamily: 'Roboto, sans-serif',
    },
  }),
}));

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));

vi.mock('../../lib/auth', () => ({
  signInWithGoogle: vi.fn(),
}));

vi.mock('utils/notifyMessage', () => ({
  errorNotifyMessage: vi.fn(),
}));

describe('SignInWithGoogle', () => {
  beforeEach(() => {
    (useTranslations as vi.Mock).mockReturnValue((key: string) => key);
    (signInWithGoogle as vi.Mock).mockResolvedValue(true);
    (errorNotifyMessage as vi.Mock).mockImplementation(() => {});
  });

  it('renders the component', () => {
    render(<SignInWithGoogle />);
    expect(screen.getByText('form.subtitle.google')).toBeInTheDocument();
    expect(screen.getByAltText('Google sign in button')).toBeInTheDocument();
  });

  it('calls signInWithGoogle on button click', async () => {
    render(<SignInWithGoogle />);
    fireEvent.click(screen.getByAltText('Google sign in button'));
    expect(signInWithGoogle).toHaveBeenCalled();
  });

  it('shows an error message on sign in failure', async () => {
    const errorMessage = 'Sign in failed';
    (signInWithGoogle as vi.Mock).mockRejectedValueOnce(new Error(errorMessage));

    render(<SignInWithGoogle />);
    fireEvent.click(screen.getByAltText('Google sign in button'));

    await waitFor(() => {
      expect(signInWithGoogle).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(errorNotifyMessage).toHaveBeenCalledWith(errorMessage);
    });
  });
});
