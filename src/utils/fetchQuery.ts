import { errorNotifyMessage } from 'utils/notifyMessage';

type FetchQueryParams = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: string | Record<string, unknown>;
};

export async function fetchQuery({ url, method = 'GET', headers = {}, body }: FetchQueryParams) {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (body) {
      options.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (e) {
    if (e instanceof Error) {
      errorNotifyMessage(e.message);
    } else {
      errorNotifyMessage('An unknown error occurred');
    }
    throw e;
  }
}
