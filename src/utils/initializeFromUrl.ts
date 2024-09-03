import { decodeBase64Url } from './encodeBase64Url';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface InitializeFromUrlResult {
  method: HttpMethod;
  url: string;
  requestBody: string;
  headers: string;
}

export const initializeFromUrl = (
  pathname: string,
  searchParams: URLSearchParams,
): InitializeFromUrlResult => {
  const parts = pathname.split('/');
  let method: HttpMethod = 'GET';
  let url = '';
  let requestBody = '';
  let headers = '{}';

  if (parts.length >= 4 && parts[2] === 'restful') {
    method = parts[3] as HttpMethod;

    if (parts.length >= 5) {
      url = decodeBase64Url(parts[4]);
    }

    if (parts.length >= 6) {
      requestBody = decodeBase64Url(parts[5]);
    }

    const headerObj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      const decodedKey = decodeURIComponent(key);
      const decodedValue = decodeURIComponent(value);

      const cleanKey = decodedKey.replace(/^["']|["']$/g, '');
      const cleanValue = decodedValue.replace(/^["']|["']$/g, '');

      headerObj[cleanKey] = cleanValue;
    });

    headers = JSON.stringify(headerObj, null, 2);
  }

  return { method, url, requestBody, headers };
};
