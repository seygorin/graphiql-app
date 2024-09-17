import { Base64 } from 'js-base64';
import { describe, expect, it } from 'vitest';
import { updateURL } from './updateURL';

describe('updateURL', () => {
  it('creates a GET URL correctly', () => {
    const method = 'GET';
    const url = 'https://api.example.com/users';
    const requestBody = '';
    const headers = 'Accept: application/json';
    const locale = 'en';

    const result = updateURL(method, url, requestBody, headers, locale);

    expect(result).toBe(`/en/restful/GET/${Base64.encodeURI(url)}?Accept=application%2Fjson`);
  });

  it('creates a POST URL with request body correctly', () => {
    const method = 'POST';
    const url = 'https://api.example.com/users';
    const requestBody = JSON.stringify({ name: 'John Doe' });
    const headers = 'Content-Type: application/json';
    const locale = 'fr';

    const result = updateURL(method, url, requestBody, headers, locale);

    expect(result).toBe(
      `/fr/restful/POST/${Base64.encodeURI(url)}/${Base64.encodeURI(requestBody)}?Content-Type=application%2Fjson`,
    );
  });

  it('handles multiple headers correctly', () => {
    const method = 'PUT';
    const url = 'https://api.example.com/users/1';
    const requestBody = JSON.stringify({ name: 'Jane Doe' });
    const headers = 'Content-Type: application/json\nAuthorization: Bearer token123';
    const locale = 'de';

    const result = updateURL(method, url, requestBody, headers, locale);

    expect(result).toBe(
      `/de/restful/PUT/${Base64.encodeURI(url)}/${Base64.encodeURI(requestBody)}?Content-Type=application%2Fjson&Authorization=Bearer%20token123`,
    );
  });

  it('uses default locale if not provided', () => {
    const method = 'DELETE';
    const url = 'https://api.example.com/users/1';
    const requestBody = '';
    const headers = '';

    const result = updateURL(method, url, requestBody, headers);

    expect(result).toBe(`/en/restful/DELETE/${Base64.encodeURI(url)}`);
  });

  it('handles empty headers correctly', () => {
    const method = 'GET';
    const url = 'https://api.example.com/users';
    const requestBody = '';
    const headers = '';
    const locale = 'es';

    const result = updateURL(method, url, requestBody, headers, locale);

    expect(result).toBe(`/es/restful/GET/${Base64.encodeURI(url)}`);
  });

  it('encodes special characters in URL correctly', () => {
    const method = 'GET';
    const url = 'https://api.example.com/users?name=John Doe&age=30';
    const requestBody = '';
    const headers = '';
    const locale = 'en';

    const result = updateURL(method, url, requestBody, headers, locale);

    expect(result).toBe(`/en/restful/GET/${Base64.encodeURI(url)}`);
  });
});
