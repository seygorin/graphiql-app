import { describe, expect, it } from 'vitest';
import {
  decodeBase64Url,
  encodeBase64Url,
  encodeGraphQLRequestParams,
  encodeRestRequestParams,
} from './encodeBase64Url';

describe('Base64Url encoding/decoding', () => {
  it('encodes and decodes URLs correctly', () => {
    const urls = [
      'https://example.com/path?query=value',
      'http://localhost:3000/api/data',
      'https://api.example.com/users/123?filter=active&sort=name',
    ];

    urls.forEach((url) => {
      const encoded = encodeBase64Url(url);
      expect(encoded).not.toBe(url);
      expect(decodeBase64Url(encoded)).toBe(url);
    });
  });

  it('handles special characters correctly', () => {
    const url = 'https://example.com/path with spaces?query=special!@#$%^&*()';
    const encoded = encodeBase64Url(url);
    expect(decodeBase64Url(encoded)).toBe(url);
  });
});

describe('GraphQL request params encoding', () => {
  it('encodes GraphQL request params correctly', () => {
    const result = encodeGraphQLRequestParams(
      'https://api.example.com/graphql',
      'query { user { name } }',
      { 'Content-Type': 'application/json' },
      '{"id": "123"}',
    );
    expect(result).toMatch(/^\/GRAPHQL\/.+\/.+/);
    expect(result).toContain('Content-Type=application%2Fjson');
    expect(result).toContain('variables=%7B%22id%22%3A%20%22123%22%7D');
  });

  it('handles GraphQL request without headers and variables', () => {
    const result = encodeGraphQLRequestParams(
      'https://api.example.com/graphql',
      'query { user { name } }',
    );
    expect(result).toMatch(/^\/GRAPHQL\/.+\/.+$/);
    expect(result).not.toContain('?');
  });

  it('encodes complex GraphQL queries correctly', () => {
    const complexQuery = `
      query GetUser($id: ID!) {
        user(id: $id) {
          name
          email
          posts {
            title
            content
          }
        }
      }
    `;
    const result = encodeGraphQLRequestParams(
      'https://api.example.com/graphql',
      complexQuery,
      { Authorization: 'Bearer token' },
      '{"id": "456"}',
    );
    expect(result).toMatch(/^\/GRAPHQL\/.+\/.+/);
    expect(result).toContain('Authorization=Bearer%20token');
    expect(result).toContain('variables=%7B%22id%22%3A%20%22456%22%7D');
  });
});

describe('REST request params encoding', () => {
  it('encodes REST request params correctly', () => {
    const result = encodeRestRequestParams(
      'POST',
      'https://api.example.com/users',
      '{"name": "John Doe"}',
      { 'Content-Type': 'application/json' },
    );
    expect(result).toMatch(/^\/POST\/.+\/.+/);
    expect(result).toContain('Content-Type=application%2Fjson');
  });

  it('handles GET request without body', () => {
    const result = encodeRestRequestParams('GET', 'https://api.example.com/users', undefined, {
      Accept: 'application/json',
    });
    expect(result).toMatch(/^\/GET\/.+/);
    expect(result).toContain('Accept=application%2Fjson');
    expect(result).not.toContain('//');
  });

  it('handles DELETE request without body', () => {
    const result = encodeRestRequestParams('DELETE', 'https://api.example.com/users/123');
    expect(result).toMatch(/^\/DELETE\/.+$/);
    expect(result).not.toContain('//');
  });

  it('encodes PUT request with body and multiple headers', () => {
    const result = encodeRestRequestParams(
      'PUT',
      'https://api.example.com/users/123',
      '{"name": "Jane Doe", "age": 30}',
      { 'Content-Type': 'application/json', Authorization: 'Bearer token' },
    );
    expect(result).toMatch(/^\/PUT\/.+\/.+/);
    expect(result).toContain('Content-Type=application%2Fjson');
    expect(result).toContain('Authorization=Bearer%20token');
  });

  it('handles request with special characters in URL and body', () => {
    const result = encodeRestRequestParams(
      'POST',
      'https://api.example.com/users?filter=active&sort=name',
      '{"name": "John & Jane", "tags": ["developer", "manager"]}',
      { 'Content-Type': 'application/json' },
    );
    expect(result).toMatch(/^\/POST\/.+\/.+/);
    expect(result).toContain('Content-Type=application%2Fjson');
    const decodedUrl = decodeBase64Url(result.split('/')[2]);
    expect(decodedUrl).toBe('https://api.example.com/users?filter=active&sort=name');
  });
});
