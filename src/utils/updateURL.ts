import { Base64 } from 'js-base64';

export const updateURL = (
  method: string,
  url: string,
  requestBody: string,
  headers: string,
  locale: string = 'en',
) => {
  const encodedUrl = Base64.encodeURI(url);
  const encodedBody = method !== 'GET' ? Base64.encodeURI(requestBody) : '';
  const headerParams = new URLSearchParams(
    headers.split('\n').reduce(
      (acc, line) => {
        const [key, value] = line.split(':');
        if (key && value) {
          acc[key.trim()] = encodeURIComponent(value.trim());
        }
        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  return `/${locale}/restful/${method}/${encodedUrl}${encodedBody ? `/${encodedBody}` : ''}?${headerParams}`;
};
