import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import RESTfulClient from './RESTfulClient';

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

vi.mock('hooks/useResizablePanes', () => ({
  useResizablePanes: () => ({ leftPaneWidth: 50, handleMouseDown: vi.fn() }),
}));

vi.mock('utils/fetchQuery', () => ({
  fetchQuery: vi.fn().mockResolvedValue({ data: 'test response' }),
}));

vi.mock('utils/saveToHistory', () => ({
  saveToHistoryFirestore: vi.fn(),
}));

vi.mock('utils/notifyMessage', () => ({
  errorNotifyMessage: vi.fn(),
}));

vi.mock('utils/encodeBase64Url', () => ({
  encodeRestRequestParams: vi.fn().mockReturnValue('/encoded-url'),
}));

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
    useMediaQuery: () => false,
  };
});

vi.mock('./HeadersEditor', () => ({
  default: ({
    headers,
    onHeadersChange,
  }: {
    headers: string;
    onHeadersChange: (value: string) => void;
  }) => (
    <textarea
      data-testid='headers-editor'
      value={headers}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onHeadersChange(e.target.value)}
    />
  ),
}));

vi.mock('./RequestBodyEditor', () => ({
  default: ({
    requestBody,
    onRequestBodyChange,
  }: {
    requestBody: string;
    onRequestBodyChange: (value: string) => void;
  }) => (
    <textarea
      data-testid='request-body-editor'
      value={requestBody}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onRequestBodyChange(e.target.value)}
    />
  ),
}));

vi.mock('./RequestForm/RequestForm', () => ({
  default: ({
    method,
    onMethodChange,
    onSendRequest,
  }: {
    method: string;
    onMethodChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onSendRequest: () => void;
  }) => (
    <div data-testid='request-form'>
      <select data-testid='method-select' value={method} onChange={onMethodChange}>
        <option value='GET'>GET</option>
        <option value='POST'>POST</option>
        <option value='PUT'>PUT</option>
        <option value='PATCH'>PATCH</option>
        <option value='DELETE'>DELETE</option>
      </select>
      <button onClick={onSendRequest}>Send Request</button>
    </div>
  ),
}));

vi.mock('./Resizer', () => ({ default: () => <div data-testid='resizer' /> }));
vi.mock('./ResponseViewer/ResponseViewer', () => ({
  default: () => <div data-testid='response-viewer' />,
}));
vi.mock('./VariablesEditor/VariablesEditor', () => ({
  default: () => <div data-testid='variables-editor' />,
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

describe('RESTfulClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, 'history', {
      value: { pushState: vi.fn() },
      writable: true,
    });
  });

  it('renders RESTfulClient component', async () => {
    render(<RESTfulClient />);
    expect(await screen.findByTestId('request-form')).toBeInTheDocument();
    expect(await screen.findByTestId('headers-editor')).toBeInTheDocument();
    expect(await screen.findByTestId('variables-editor')).toBeInTheDocument();
    expect(await screen.findByTestId('response-viewer')).toBeInTheDocument();
  });

  it('updates URL when send request button is clicked', async () => {
    render(<RESTfulClient />);
    const sendButton = await screen.findByText('Send Request');
    await userEvent.click(sendButton);

    await waitFor(() => {
      expect(window.history.pushState).toHaveBeenCalled();
    });
  });

  it('does not render RequestBodyEditor for GET and DELETE methods', async () => {
    render(<RESTfulClient />);
    const methodSelect = await screen.findByTestId('method-select');

    await userEvent.selectOptions(methodSelect, 'GET');
    expect(screen.queryByTestId('request-body-editor')).not.toBeInTheDocument();

    await userEvent.selectOptions(methodSelect, 'DELETE');
    expect(screen.queryByTestId('request-body-editor')).not.toBeInTheDocument();
  });

  it('renders RequestBodyEditor for POST, PUT, and PATCH methods', async () => {
    render(<RESTfulClient />);
    const methodSelect = await screen.findByTestId('method-select');

    await userEvent.selectOptions(methodSelect, 'POST');
    expect(await screen.findByTestId('request-body-editor')).toBeInTheDocument();

    await userEvent.selectOptions(methodSelect, 'PUT');
    expect(await screen.findByTestId('request-body-editor')).toBeInTheDocument();

    await userEvent.selectOptions(methodSelect, 'PATCH');
    expect(await screen.findByTestId('request-body-editor')).toBeInTheDocument();
  });
});
