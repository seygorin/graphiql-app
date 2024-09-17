import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NotFound from '../app/not-found';

vi.mock('next/error', () => ({
  default: ({ statusCode }: { statusCode: number }) => (
    <div data-testid='next-error'>Error: {statusCode}</div>
  ),
}));

describe('NotFound', () => {
  it('renders NotFound component', () => {
    const { container } = render(<NotFound />);
    expect(container.querySelector('html')).toHaveAttribute('lang', 'en');
  });

  it('renders Error component with 404 status code', () => {
    const { getByTestId } = render(<NotFound />);
    const errorComponent = getByTestId('next-error');
    expect(errorComponent).toHaveTextContent('Error: 404');
  });

  it('renders body tag', () => {
    const { container } = render(<NotFound />);
    expect(container.querySelector('body')).toBeInTheDocument();
  });

  it('has correct structure', () => {
    const { container } = render(<NotFound />);
    const html = container.querySelector('html');
    const body = container.querySelector('body');
    const error = container.querySelector('[data-testid="next-error"]');

    expect(html).toContainElement(body);
    expect(body).toContainElement(error);
  });
});
