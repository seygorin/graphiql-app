import { describe, expect, it } from 'vitest';
import stringAvatar from './getStringAvatar';

describe('stringAvatar', () => {
  it('should generate correct avatar object for a single name', () => {
    const result = stringAvatar('John');
    expect(result.children).toBe('J');
    expect(result.sx.bgcolor).toMatch(/^#[0-9A-F]{6}$/i);
  });

  it('should generate correct avatar object for a full name', () => {
    const result = stringAvatar('John Doe');
    expect(result.children).toBe('JD');
    expect(result.sx.bgcolor).toMatch(/^#[0-9A-F]{6}$/i);
  });

  it('should generate correct avatar object for names with multiple spaces', () => {
    const result = stringAvatar('John Michael Doe');
    expect(result.children).toBe('JM');
    expect(result.sx.bgcolor).toMatch(/^#[0-9A-F]{6}$/i);
  });

  it('should handle empty strings gracefully', () => {
    const result = stringAvatar('');
    expect(result.children).toBe('');
    expect(result.sx.bgcolor).toMatch(/^#[0-9A-F]{6}$/i);
  });
});
