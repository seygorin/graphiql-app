import { notFound } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';
import CatchAllPage from '../app/[locale]/[...rest]/page';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

describe('CatchAllPage', () => {
  it('calls notFound function', () => {
    CatchAllPage();

    expect(notFound).toHaveBeenCalled();
  });

  it('calls notFound function only once', () => {
    vi.mocked(notFound).mockClear();

    CatchAllPage();

    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it('does not return any JSX', () => {
    const result = CatchAllPage();
    expect(result).toBeUndefined();
  });
});
