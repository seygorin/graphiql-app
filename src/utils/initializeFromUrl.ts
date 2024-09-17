import { decodeBase64Url } from './encodeBase64Url';
import { errorNotifyMessage } from './notifyMessage';

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

  try {
    if (parts.length >= 3) {
      result.method = parts[2] as AllMethods;

      if (parts.length >= 4) {
        result.url = decodeBase64Url(parts[3]);
      }

      if (parts.length >= 5) {
        if (result.method === 'GRAPHQL') {
          result.query = decodeBase64Url(parts[4]);
        } else {
          result.variables = decodeBase64Url(parts[4]);
        }
      }

      if (parts.length >= 6) {
        if (result.method === 'GRAPHQL') {
          result.variables = decodeBase64Url(parts[5]);
        } else {
          result.requestBody = decodeBase64Url(parts[5]);
        }
      }

      if (searchParams.size > 0) {
        const headerObj: Record<string, string> = {};

        searchParams.forEach((value, key) => {
          const decodedKey = decodeURIComponent(key);
          const decodedValue = decodeURIComponent(value);

          const cleanKey = decodedKey.replace(/^["']|["']$/g, '');
          const cleanValue = decodedValue.replace(/^["']|["']$/g, '');

          headerObj[cleanKey] = cleanValue;
        });

        result.headers = JSON.stringify(headerObj, null, 2);
      }

      if (result.variables) {
        try {
          const parsedVariables = JSON.parse(result.variables);
          result.variables = JSON.stringify(parsedVariables, null, 2);
        } catch (e) {
          errorNotifyMessage('Error parsing variables JSON');
        }
      }
    }
  } catch (error) {
    errorNotifyMessage('Error initializing from URL');
  }

  return result;
};
