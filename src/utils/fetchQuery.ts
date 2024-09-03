import { errorNotifyMessage } from 'utils/notifyMessage';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface FetchQueryParams {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: string | Record<string, unknown>;
  variables?: Record<string, unknown>;
}

export async function fetchQuery({
  url,
  method,
  headers = {},
  body,
  variables,
}: FetchQueryParams): Promise<Record<string, unknown>> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    let finalUrl = url;

    if (method === 'GET' && variables) {
      const queryParams = new URLSearchParams(
        Object.entries(variables).map(([key, value]) => [key, String(value)]),
      ).toString();
      finalUrl = `${url}${url.includes('?') ? '&' : '?'}${queryParams}`;
    } else if (body && variables) {
      if (typeof body === 'string') {
        const parsedBody = JSON.parse(body);
        options.body = JSON.stringify({ ...parsedBody, variables });
      } else {
        options.body = JSON.stringify({ ...body, variables });
      }
    } else if (body) {
      options.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    const response = await fetch(finalUrl, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Record<string, unknown>;
  } catch (e) {
    if (e instanceof Error) {
      errorNotifyMessage(e.message);
    } else {
      errorNotifyMessage('An unknown error occurred');
    }
    throw e;
  }
}
