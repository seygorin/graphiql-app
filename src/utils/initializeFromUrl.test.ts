import { describe, expect, it } from 'vitest';
import { encodeBase64Url } from './encodeBase64Url';
import { initializeFromUrl } from './initializeFromUrl';

describe('initializeFromUrl', () => {
  it('parses HTTP method and URL correctly', () => {
    const pathname = `/api/GET/${encodeBase64Url('https://api.example.com/users')}`;
    const searchParams = new URLSearchParams();

    const result = initializeFromUrl(pathname, searchParams);

    expect(result.method).toBe('GET');
    expect(result.url).toBe('https://api.example.com/users');
  });

  it('parses HTTP method, URL and request body correctly', () => {
    const pathname = `/api/POST/${encodeBase64Url('https://api.example.com/users')}/${encodeBase64Url('{"name":"John Doe"}')}`;
    const searchParams = new URLSearchParams();

    const result = initializeFromUrl(pathname, searchParams);

    expect(result.method).toBe('POST');
    expect(result.url).toBe('https://api.example.com/users');
    expect(result.requestBody).toBe('{"name":"John Doe"}');
  });

  it('parses GraphQL query correctly', () => {
    const pathname = `/api/GRAPHQL/${encodeBase64Url('https://api.example.com/graphql')}/${encodeBase64Url('query { user(id: $id) { name } }')}`;
    const searchParams = new URLSearchParams();

    const result = initializeFromUrl(pathname, searchParams);

    expect(result.method).toBe('GRAPHQL');
    expect(result.url).toBe('https://api.example.com/graphql');
    expect(result.query).toBe('query { user(id: $id) { name } }');
  });

  it('parses headers correctly', () => {
    const pathname = `/api/GET/${encodeBase64Url('https://api.example.com/users')}`;
    const searchParams = new URLSearchParams();
    searchParams.append('Content-Type', 'application/json');
    searchParams.append('Authorization', 'Bearer token123');

    const result = initializeFromUrl(pathname, searchParams);

    expect(result.headers).toBe(
      JSON.stringify(
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token123',
        },
        null,
        2,
      ),
    );
  });

  it('parses GraphQL variables correctly', () => {
    const pathname = `/api/GRAPHQL/${encodeBase64Url('https://api.example.com/graphql')}/${encodeBase64Url('query { user(id: $id) { name } }')}`;
    const searchParams = new URLSearchParams();
    searchParams.append('variables', '{"id":"123"}');

    const result = initializeFromUrl(pathname, searchParams);

    expect(result.method).toBe('GRAPHQL');
    expect(result.url).toBe('https://api.example.com/graphql');
    expect(result.query).toBe('query { user(id: $id) { name } }');
    expect(result.variables).toBe(JSON.stringify({ variables: { id: '123' } }, null, 2));
  });

  it('handles invalid paths gracefully', () => {
    const pathname = '/api';
    const searchParams = new URLSearchParams();

    const result = initializeFromUrl(pathname, searchParams);

    expect(result).toEqual({});
  });
});
