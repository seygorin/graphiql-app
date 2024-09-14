import { useLocale, useTranslations } from 'next-intl';
import { useAuthState } from 'react-firebase-hooks/auth';
import { render, screen, waitFor } from '@testing-library/react';
import { collection, getDocs } from 'firebase/firestore';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import HistoryComponent from 'components/HistoryComponent/HistoryComponent';
import { errorNotifyMessage } from 'utils/notifyMessage';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useLocale: vi.fn(),
  useTranslations: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  deleteDoc: vi.fn(),
  getDocs: vi.fn(),
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
}));

vi.mock('../../lib/firebase', () => ({
  auth: {},
  db: {},
}));

vi.mock('utils/notifyMessage', () => ({
  errorNotifyMessage: vi.fn(),
  warningNotifyMessage: vi.fn(),
}));

vi.mock('./utils', () => ({
  encodeBase64Url: vi.fn((input) => btoa(input)),
}));

describe('HistoryComponent', () => {
  const t = (key: string) => key;
  const mockUser = { uid: 'user-123' };

  beforeEach(() => {
    (useAuthState as vi.Mock).mockReturnValue([mockUser, false, undefined]);
    (useLocale as vi.Mock).mockReturnValue('en');
    (useTranslations as vi.Mock).mockReturnValue(t);
    (collection as vi.Mock).mockReturnValue({});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the component and load history items', async () => {
    const mockHistoryItems = [
      {
        id: '1',
        method: 'GET',
        url: 'https://example.com',
        timestamp: 1633046400000,
        userUid: 'user-123',
      },
      {
        id: '2',
        method: 'POST',
        url: 'https://example.com',
        timestamp: 1633046500000,
        userUid: 'user-123',
      },
    ];

    (getDocs as vi.Mock).mockResolvedValue({
      docs: mockHistoryItems.map((item) => ({ id: item.id, data: () => item })),
    });

    render(<HistoryComponent />);

    await waitFor(() => expect(screen.getByText('GET')).toBeInTheDocument());
    expect(screen.getByText('POST')).toBeInTheDocument();
  });

  it('should handle error when loading history items', async () => {
    (getDocs as vi.Mock).mockRejectedValue(new Error('Loading error'));

    render(<HistoryComponent />);

    await waitFor(() =>
      expect(errorNotifyMessage).toHaveBeenCalledWith('history.errorLoadingHistory'),
    );
    expect(screen.getByText('history.noRequests')).toBeInTheDocument();
  });

  it('should generate correct link for GRAPHQL method with headers and variables', async () => {
    const mockHistoryItems = [
      {
        id: '1',
        method: 'GRAPHQL',
        url: 'https://example.com/graphql',
        requestBody: 'query { user { id name } }',
        headers: JSON.stringify({ Authorization: 'Bearer token' }),
        variables: '{"id": 1}',
        timestamp: 1726146117402,
        userUid: 'user-123',
      },
    ];

    (getDocs as vi.Mock).mockResolvedValue({
      docs: mockHistoryItems.map((item) => ({ id: item.id, data: () => item })),
    });

    render(<HistoryComponent />);

    await waitFor(() => expect(screen.getByText('GRAPHQL')).toBeInTheDocument());

    const link = screen.getByRole('link', { name: /https:\/\/example.com\/graphql/i });
    expect(link).toHaveAttribute(
      'href',
      '/en/GRAPHQL/aHR0cHM6Ly9leGFtcGxlLmNvbS9ncmFwaHFs/cXVlcnkgeyB1c2VyIHsgaWQgbmFtZSB9IH0?Authorization=Bearer%20token&variables=%7B%22id%22%3A%201%7D',
    );
  });

  it('should generate correct link for GET method with headers', async () => {
    const mockHistoryItems = [
      {
        id: '1',
        method: 'GET',
        url: 'https://example.com',
        headers: JSON.stringify({ Authorization: 'Bearer token' }),
        timestamp: 1633046400000,
        userUid: 'user-123',
      },
    ];

    (getDocs as vi.Mock).mockResolvedValue({
      docs: mockHistoryItems.map((item) => ({ id: item.id, data: () => item })),
    });

    render(<HistoryComponent />);

    await waitFor(() => expect(screen.getByText('GET')).toBeInTheDocument());

    const link = screen.getByRole('link', { name: /https:\/\/example.com/i });
    expect(link).toHaveAttribute(
      'href',
      '/en/GET/aHR0cHM6Ly9leGFtcGxlLmNvbQ?Authorization=Bearer%20token',
    );
  });

  it('should render the correct color with getChipColor', async () => {
    const mockHistoryItems = [
      {
        id: '1',
        method: 'GET',
        url: 'https://example.com',
        timestamp: 1726146950356,
        userUid: 'user-1',
      },
      {
        id: '2',
        method: 'POST',
        url: 'https://example.com',
        timestamp: 1726146950357,
        userUid: 'user-2',
      },
      {
        id: '3',
        method: 'PUT',
        url: 'https://example.com',
        timestamp: 1726146950358,
        userUid: 'user-3',
      },
      {
        id: '4',
        method: 'DELETE',
        url: 'https://example.com',
        timestamp: 1726146950359,
        userUid: 'user-4',
      },
      {
        id: '5',
        method: 'PATCH',
        url: 'https://example.com',
        timestamp: 1726146950360,
        userUid: 'user-5',
      },
      {
        id: '6',
        method: 'GRAPHQL',
        url: 'https://example.com',
        timestamp: 1726146950361,
        userUid: 'user-6',
      },
      {
        id: '7',
        method: 'OPTIONS',
        url: 'https://example.com',
        timestamp: 1726146950362,
        userUid: 'user-7',
      },
    ];

    (getDocs as vi.Mock).mockResolvedValue({
      docs: mockHistoryItems.map((item) => ({ id: item.id, data: () => item })),
    });

    render(<HistoryComponent />);

    await waitFor(() =>
      expect(screen.getByText('GET')).toHaveStyle({ backgroundColor: 'success' }),
    );
    expect(screen.getByText('POST')).toHaveStyle({ backgroundColor: 'primary' });
    expect(screen.getByText('PUT')).toHaveStyle({ backgroundColor: 'warning' });
    expect(screen.getByText('DELETE')).toHaveStyle({ backgroundColor: 'error' });
    expect(screen.getByText('PATCH')).toHaveStyle({ backgroundColor: 'info' });
    expect(screen.getByText('GRAPHQL')).toHaveStyle({ backgroundColor: 'secondary' });
    expect(screen.getByText('OPTIONS')).toHaveStyle({ backgroundColor: 'default' });
  });
});
