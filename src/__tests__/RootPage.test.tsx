import { redirect } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';
import RootPage from '../app/page';

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('RootPage', () => {
  it('calls redirect with correct path', () => {
    RootPage();

    expect(redirect).toHaveBeenCalledWith('/en');
  });

  it('calls redirect only once', () => {
    vi.mocked(redirect).mockClear();

    RootPage();

    expect(redirect).toHaveBeenCalledTimes(1);
  });
});
