import { Base64 } from 'js-base64';

export function encodeBase64Url(url: string): string {
  return Base64.encodeURI(url);
}

export function decodeBase64Url(encodedUrl: string): string {
  return Base64.decode(encodedUrl);
}

export function encodeRequestParams(
  method: string,
  url: string,
  body?: string,
  headers?: Record<string, string>,
): string {
  const encodedUrl = encodeBase64Url(url);
  const encodedBody = body ? `/${encodeBase64Url(body)}` : '';
  const encodedHeaders = headers
    ? `?${new URLSearchParams(
        Object.entries(headers).reduce(
          (acc, [key, value]) => {
            acc[key] = encodeURIComponent(value);
            return acc;
          },
          {} as Record<string, string>,
        ),
      ).toString()}`
    : '';

  return `/${method}/${encodedUrl}${encodedBody}${encodedHeaders}`;
}
