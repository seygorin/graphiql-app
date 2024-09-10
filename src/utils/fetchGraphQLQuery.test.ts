import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchGraphQLQuery } from './fetchGraphQLQuery';

describe('fetchGraphQLQuery', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('sends a correct POST request', async () => {
    const mockResponse = { data: { user: { name: 'John' } } };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await fetchGraphQLQuery({
      url: 'https://api.example.com/graphql',
      query: 'query { user { name } }',
      variables: { id: '123' },
      headers: { Authorization: 'Bearer token' },
    });

    expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token',
      },
      body: JSON.stringify({
        query: 'query { user { name } }',
        variables: { id: '123' },
      }),
    });

    expect(result).toEqual(mockResponse);
  });

  it('throws an error for non-OK responses', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
    });

    await expect(
      fetchGraphQLQuery({
        url: 'https://api.example.com/graphql',
        query: 'query { user { name } }',
      }),
    ).rejects.toThrow('HTTP error! status: 400');
  });

  it('throws a custom error for network failures', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    await expect(
      fetchGraphQLQuery({
        url: 'https://api.example.com/graphql',
        query: 'query { user { name } }',
      }),
    ).rejects.toThrow('GraphQL query failed: Network error');
  });

  it('throws a generic error for unknown failures', async () => {
    global.fetch = vi.fn().mockRejectedValue('Unknown error');

    await expect(
      fetchGraphQLQuery({
        url: 'https://api.example.com/graphql',
        query: 'query { user { name } }',
      }),
    ).rejects.toThrow('An unknown error occurred during the GraphQL query');
  });
});
