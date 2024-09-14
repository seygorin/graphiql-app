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

    expect(JSON.parse(result.headers || '{}')).toEqual({
      'Content-Type': 'application/json',
      Authorization: 'Bearer token123',
    });
  });

  it('parses GraphQL variables correctly', () => {
    const pathname = `/api/GRAPHQL/${encodeBase64Url('https://api.example.com/graphql')}/${encodeBase64Url('query { user(id: $id) { name } }')}/${encodeBase64Url('{"id":"123"}')}`;
    const searchParams = new URLSearchParams();

    const result = initializeFromUrl(pathname, searchParams);

    expect(result.method).toBe('GRAPHQL');
    expect(result.url).toBe('https://api.example.com/graphql');
    expect(result.query).toBe('query { user(id: $id) { name } }');
    expect(JSON.parse(result.variables || '{}')).toEqual({ id: '123' });
  });

  it('handles invalid paths gracefully', () => {
    const pathname = '/api';
    const searchParams = new URLSearchParams();

    const result = initializeFromUrl(pathname, searchParams);

    expect(result).toEqual({});
  });
});
