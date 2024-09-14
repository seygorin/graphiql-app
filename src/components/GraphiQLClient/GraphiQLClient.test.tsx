import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import GraphiQLClient from './GraphiQLClient';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/test',
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [{ uid: 'test-uid' }, false, null],
}));

vi.mock('@mui/material', async () => {
  const actual = (await vi.importActual('@mui/material')) as object;
  return {
    ...actual,
    useMediaQuery: () => false,
    useTheme: () => ({ breakpoints: { down: () => false } }),
  } as Partial<typeof actual> & {
    useMediaQuery: () => boolean;
    useTheme: () => { breakpoints: { down: () => boolean } };
  };
});

vi.mock('hooks/useResizablePanes', () => ({
  useResizablePanes: () => ({ leftPaneWidth: 50, handleMouseDown: vi.fn() }),
}));

vi.mock('utils/encodeBase64Url', () => ({
  encodeGraphQLRequestParams: vi.fn(() => '/encoded-path'),
}));

vi.mock('utils/fetchGraphQLQuery', () => ({
  fetchGraphQLQuery: vi.fn(() => Promise.resolve({ data: { test: 'response' } })),
}));

vi.mock('utils/initializeFromUrl', () => ({
  initializeFromUrl: vi.fn(() => ({
    url: 'https://test.com/graphql',
    query: 'query { test }',
    headers: '{}',
    variables: '{}',
    sdlUrl: 'https://test.com/graphql?sdl',
  })),
}));

vi.mock('utils/notifyMessage', () => ({
  errorNotifyMessage: vi.fn(),
}));

vi.mock('utils/saveToHistory', () => ({
  saveToHistoryFirestore: vi.fn(),
}));

vi.mock('../../lib/firebase', () => ({
  auth: {},
}));

vi.mock('components/RESTfulClient/Resizer', () => ({ default: () => <div>Resizer</div> }));
vi.mock('./QueryEditor', () => ({ default: () => <div>QueryEditor</div> }));
vi.mock('components/RESTfulClient/VariablesEditor', () => ({
  default: () => <div>VariablesEditor</div>,
}));
vi.mock('components/RESTfulClient/HeadersEditor', () => ({
  default: () => <div>HeadersEditor</div>,
}));
vi.mock('components/RESTfulClient/ResponseViewer', () => ({
  default: () => <div>ResponseViewer</div>,
}));
vi.mock('../DocumentationViewer', () => ({ default: () => <div>DocumentationViewer</div> }));

describe('GraphiQLClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handles send request', async () => {
    render(<GraphiQLClient />);
    const sendButton = screen.getByTestId('send-request-button');
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('ResponseViewer')).toBeInTheDocument();
    });
  });
});
