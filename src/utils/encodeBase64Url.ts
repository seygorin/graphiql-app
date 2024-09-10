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

  let encodedHeaders = '';
  if (headers) {
    const headerPairs = Object.entries(headers).map(
      ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    );
    encodedHeaders = headerPairs.length > 0 ? `?${headerPairs.join('&')}` : '';
  }

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

  let params: string[] = [];
  if (headers) {
    params = params.concat(
      Object.entries(headers).map(
        ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      ),
    );
  }
  if (variables) {
    params.push(`variables=${encodeURIComponent(variables)}`);
  }

  const encodedParams = params.length > 0 ? `?${params.join('&')}` : '';

  return `/GRAPHQL/${encodedEndpoint}/${encodedQuery}${encodedParams}`;
}
