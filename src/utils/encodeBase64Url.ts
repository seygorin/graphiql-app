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
  variables?: Record<string, string>,
): string {
  const encodedUrl = encodeBase64Url(url);
  const encodedBody =
    body && method !== 'GET' && method !== 'DELETE' ? `/${encodeBase64Url(body)}` : '';

  let encodedVariables = '';
  if (variables && Object.keys(variables).length > 0) {
    const variablesString = JSON.stringify(variables);
    encodedVariables = `/${encodeBase64Url(variablesString)}`;
  }

  let encodedHeaders = '';
  if (headers) {
    const headerPairs = Object.entries(headers).map(
      ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    );
    encodedHeaders = headerPairs.length > 0 ? `?${headerPairs.join('&')}` : '';
  }

  return `/${method}/${encodedUrl}${encodedVariables}${encodedBody}${encodedHeaders}`;
}

export function encodeGraphQLRequestParams(
  endpoint: string,
  query: string,
  headers?: Record<string, string>,
  variables?: string,
): string {
  const encodedEndpoint = encodeBase64Url(endpoint);
  const encodedQuery = encodeBase64Url(query);
  const encodedVariables = variables ? `/${encodeBase64Url(variables)}` : '';

  let headerParams: string[] = [];
  if (headers) {
    headerParams = Object.entries(headers).map(
      ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    );
  }

  const encodedParams = headerParams.length > 0 ? `?${headerParams.join('&')}` : '';

  return `/GRAPHQL/${encodedEndpoint}/${encodedQuery}${encodedVariables}${encodedParams}`;
}
