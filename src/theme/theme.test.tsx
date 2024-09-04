import { describe, expect, it } from 'vitest';
import theme from './theme';

describe('MUI Theme Configuration', () => {
  it('should have the correct primary color', () => {
    expect(theme.palette.primary.main).toBe('rgba(41,108,235,0.9)');
  });

  it('should have default typography configuration', () => {
    expect(theme.typography.htmlFontSize).toBe(16);
  });
});
