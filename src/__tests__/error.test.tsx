import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ErrorError from '../app/[locale]/error';

vi.mock('../theme/theme', () => ({
  default: {},
}));

vi.mock('../components/ComponentError', () => ({
  default: ({ error }: { error: Error }) => (
    <div data-testid='component-error'>Error: {error.message}</div>
  ),
}));

describe('ErrorError', () => {
  it('renders ComponentError with the provided error', () => {
    const testError = new Error('Test error message');
    render(<ErrorError error={testError} />);

    const componentError = screen.getByTestId('component-error');
    expect(componentError).toBeInTheDocument();
    expect(componentError).toHaveTextContent('Error: Test error message');
  });

  it('passes the error prop to ComponentError', () => {
    const testError = new Error('Another test error');
    render(<ErrorError error={testError} />);

    expect(screen.getByText('Error: Another test error')).toBeInTheDocument();
  });
});
