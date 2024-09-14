import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { render, screen, waitFor } from '@testing-library/react';
import { User } from 'firebase/auth';
import { getDocs } from 'firebase/firestore';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { errorNotifyMessage } from 'utils/notifyMessage';
import HistoryComponent from './HistoryComponent';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

vi.mock('react-firebase-hooks/auth');
vi.mock('firebase/firestore');
vi.mock('utils/notifyMessage');
vi.mock('../../lib/firebase', () => ({
  auth: {},
  db: {},
}));

vi.mock('../Loader', () => ({
  default: () => <div data-testid='loader'>Loading...</div>,
}));

describe('HistoryComponent', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders loader while loading', () => {
    const mockUser: Partial<User> = { uid: 'user1' };
    vi.mocked(useAuthState).mockReturnValue([mockUser as User, false, undefined]);

    render(<HistoryComponent />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders history items when loaded', async () => {
    const mockUser: Partial<User> = { uid: 'user1' };
    vi.mocked(useAuthState).mockReturnValue([mockUser as User, false, undefined]);

    render(<HistoryComponent />);
  });

  it('shows error message when loading history fails', async () => {
    const mockUser: Partial<User> = { uid: 'user1' };
    vi.mocked(useAuthState).mockReturnValue([mockUser as User, false, undefined]);
    vi.mocked(getDocs).mockRejectedValue(new Error('Loading failed'));

    render(<HistoryComponent />);

    await waitFor(() => {
      expect(vi.mocked(errorNotifyMessage)).toHaveBeenCalledWith('history.errorLoadingHistory');
    });
  });
});
