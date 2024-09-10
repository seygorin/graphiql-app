import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchQuery } from './fetchQuery';

describe('fetchQuery', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('sends a GET request with query parameters', async () => {
    const mockResponse = { data: 'test' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await fetchQuery({
      url: 'https://api.example.com/data',
      method: 'GET',
      variables: { id: '123', name: 'test' },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/data?id=123&name=test',
      expect.objectContaining({
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('sends a POST request with body', async () => {
    const mockResponse = { success: true };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await fetchQuery({
      url: 'https://api.example.com/data',
      method: 'POST',
      body: { name: 'John', age: 30 },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/data',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'John', age: 30 }),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('sends a POST request with body and variables', async () => {
    const mockResponse = { success: true };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await fetchQuery({
      url: 'https://api.example.com/data',
      method: 'POST',
      body: { query: 'test' },
      variables: { id: '123' },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/data',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'test', variables: { id: '123' } }),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('handles non-OK responses', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
    });

    await expect(
      fetchQuery({
        url: 'https://api.example.com/data',
        method: 'GET',
      }),
    ).rejects.toThrow('HTTP error! status: 400');
  });

  it('handles network errors', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    await expect(
      fetchQuery({
        url: 'https://api.example.com/data',
        method: 'GET',
      }),
    ).rejects.toThrow('Network error');
  });

  it('handles unknown errors', async () => {
    global.fetch = vi.fn().mockRejectedValue('Unknown error');

    await expect(
      fetchQuery({
        url: 'https://api.example.com/data',
        method: 'GET',
      }),
    ).rejects.toThrow('Unknown error');
  });
});
