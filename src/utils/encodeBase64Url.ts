import { Base64 } from 'js-base64';

export function encodeBase64Url(url: string): string {
  return Base64.encodeURI(url);
}

export function decodeBase64Url(encodedUrl: string): string {
  return Base64.decode(encodedUrl);
}

export function encodeRestRequestParams(
  method: string,
  url: string,
  body?: string,
  headers?: Record<string, string>,
): string {
  const encodedUrl = encodeBase64Url(url);
  const encodedBody =
    body && method !== 'GET' && method !== 'DELETE' ? `/${encodeBase64Url(body)}` : '';
  const queryParams = new URLSearchParams();

  if (headers) {
    Object.entries(headers).forEach(([key, value]) => {
      queryParams.append(key, encodeURIComponent(value));
    });
  }

  const encodedHeaders = queryParams.toString() ? `?${queryParams.toString()}` : '';

  return `/${method}/${encodedUrl}${encodedBody}${encodedHeaders}`;
}

export function encodeGraphQLRequestParams(
  endpoint: string,
  query: string,
  headers?: Record<string, string>,
  variables?: string,
): string {
  const encodedEndpoint = encodeBase64Url(endpoint);
  const encodedQuery = encodeBase64Url(query);
  const queryParams = new URLSearchParams();

  if (headers) {
    Object.entries(headers).forEach(([key, value]) => {
      queryParams.append(key, encodeURIComponent(value));
    });
  }

  if (variables) {
    queryParams.append('variables', encodeURIComponent(variables));
  }

  const encodedParams = queryParams.toString() ? `?${queryParams.toString()}` : '';

  return `/GRAPHQL/${encodedEndpoint}/${encodedQuery}${encodedParams}`;
}
