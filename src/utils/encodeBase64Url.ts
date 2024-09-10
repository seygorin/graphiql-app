import { Base64 } from 'js-base64';

export function encodeBase64Url(url: string): string {
  return Base64.encodeURI(url);
}

export function decodeBase64Url(encodedUrl: string): string {
  return Base64.decode(encodedUrl);
}

export function encodeGraphQLRequestParams(
  endpoint: string,
  query: string,
  headers: Record<string, string>,
  variables: string,
): string {
  const encodedEndpoint = encodeBase64Url(endpoint);
  const encodedQuery = encodeBase64Url(query.trim());
  const headerParams = new URLSearchParams(headers).toString();
  return `/GRAPHQL/${encodedEndpoint}/${encodedQuery}?${headerParams}&variables=${encodeURIComponent(variables)}`;
}

export function encodeRestRequestParams(
  method: string,
  url: string,
  body: string,
  headers: Record<string, string>,
): string {
  const encodedUrl = encodeBase64Url(url);
  const encodedBody = body ? `/${encodeBase64Url(body.trim())}` : '';
  const headerParams = new URLSearchParams(headers).toString();
  return `/${method}/${encodedUrl}${encodedBody}?${headerParams}`;
}
