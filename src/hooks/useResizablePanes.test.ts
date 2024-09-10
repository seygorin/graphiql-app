import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useResizablePanes } from './useResizablePanes';

describe('useResizablePanes', () => {
  it('should initialize with default width', () => {
    const { result } = renderHook(() => useResizablePanes());
    expect(result.current.leftPaneWidth).toBe(50);
  });

  it('should initialize with custom width', () => {
    const { result } = renderHook(() => useResizablePanes(60));
    expect(result.current.leftPaneWidth).toBe(60);
  });
});
