import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { saveToHistory } from './saveToHistory';

describe('saveToHistory', () => {
  const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
  };

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('saves new item to empty history', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    const now = new Date('2023-01-01T00:00:00Z');
    vi.setSystemTime(now);

    const requestData = {
      method: 'GET',
      url: 'https://api.example.com/data',
    };

    saveToHistory(requestData);

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'requestHistory',
      JSON.stringify([
        {
          ...requestData,
          id: now.getTime().toString(),
          timestamp: now.getTime(),
        },
      ]),
    );
  });

  it('adds new item to existing history', () => {
    const existingHistory = [
      {
        method: 'POST',
        url: 'https://api.example.com/users',
        id: '1672531200000',
        timestamp: 1672531200000,
      },
    ];
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(existingHistory));
    const now = new Date('2023-01-02T00:00:00Z');
    vi.setSystemTime(now);

    const requestData = {
      method: 'GET',
      url: 'https://api.example.com/data',
    };

    saveToHistory(requestData);

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'requestHistory',
      JSON.stringify([
        ...existingHistory,
        {
          ...requestData,
          id: now.getTime().toString(),
          timestamp: now.getTime(),
        },
      ]),
    );
  });

  it('limits history to 50 items', () => {
    const existingHistory = Array.from({ length: 50 }, (_, i) => ({
      method: 'GET',
      url: `https://api.example.com/data/${i}`,
      id: (1672531200000 + i).toString(),
      timestamp: 1672531200000 + i,
    }));
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(existingHistory));
    const now = new Date('2023-01-02T00:00:00Z');
    vi.setSystemTime(now);

    const requestData = {
      method: 'POST',
      url: 'https://api.example.com/newdata',
    };

    saveToHistory(requestData);

    const savedHistory = JSON.parse(mockLocalStorage.setItem.mock.calls[0][1]);
    expect(savedHistory.length).toBe(50);
    expect(savedHistory[49]).toEqual({
      ...requestData,
      id: now.getTime().toString(),
      timestamp: now.getTime(),
    });
    expect(savedHistory[0].url).toBe('https://api.example.com/data/1');
  });

  it('handles additional properties in requestData', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    const now = new Date('2023-01-01T00:00:00Z');
    vi.setSystemTime(now);

    const requestData = {
      method: 'POST',
      url: 'https://api.example.com/graphql',
      requestBody: '{ "query": "{ user { name } }" }',
      headers: '{ "Content-Type": "application/json" }',
      variables: '{ "id": "123" }',
      sdlUrl: 'https://api.example.com/schema.graphql',
    };

    saveToHistory(requestData);

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'requestHistory',
      JSON.stringify([
        {
          ...requestData,
          id: now.getTime().toString(),
          timestamp: now.getTime(),
        },
      ]),
    );
  });
});
