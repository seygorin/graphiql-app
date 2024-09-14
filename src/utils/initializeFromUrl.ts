import { decodeBase64Url } from './encodeBase64Url';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type GraphQLMethod = 'GRAPHQL';
export type AllMethods = HttpMethod | GraphQLMethod;

interface InitializeFromUrlResult {
  method?: AllMethods;
  url?: string;
  sdlUrl?: string;
  requestBody?: string;
  headers?: string;
  query?: string;
  variables?: string;
}

export const initializeFromUrl = (
  pathname: string,
  searchParams: URLSearchParams,
): InitializeFromUrlResult => {
  const parts = pathname.split('/');
  const result: InitializeFromUrlResult = {};

  if (parts.length >= 3) {
    result.method = parts[2] as AllMethods;

    if (parts.length >= 4) {
      result.url = decodeBase64Url(parts[3]);
    }

    if (parts.length >= 5) {
      if (result.method === 'GRAPHQL') {
        result.query = decodeBase64Url(parts[4]);
      } else {
        result.requestBody = decodeBase64Url(parts[4]);
      }
    }

    if (searchParams.size > 0) {
      const headerObj: Record<string, string> = {};
      const variablesObj: Record<string, unknown> = {};

      searchParams.forEach((value, key) => {
        const decodedKey = decodeURIComponent(key);
        const decodedValue = decodeURIComponent(value);

        const cleanKey = decodedKey.replace(/^["']|["']$/g, '');
        const cleanValue = decodedValue.replace(/^["']|["']$/g, '');

        if (cleanKey === 'variables' && result.method === 'GRAPHQL') {
          try {
            variablesObj[cleanKey] = JSON.parse(cleanValue);
          } catch (e) {
            variablesObj[cleanKey] = cleanValue;
          }
        } else {
          headerObj[cleanKey] = cleanValue;
        }
      });

      result.headers = JSON.stringify(headerObj, null, 2);

      if (Object.keys(variablesObj).length > 0) {
        result.variables = JSON.stringify(variablesObj, null, 2);
      }
    }
  }

  return result;
};
