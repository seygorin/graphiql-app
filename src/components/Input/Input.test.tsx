import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Input from './Input';

test('Input', () => {
  render(<Input />);
  expect(screen.getByRole('textbox')).toBeDefined();
});
