import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Button from './Button';

test('Button', () => {
  render(<Button>Button</Button>);
  expect(screen.getByRole('button')).toBeDefined();
});
