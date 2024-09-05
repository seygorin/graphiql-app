import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

const MESSAGE_OK = 'No errors occurred';
const MESSAGE_ERROR = 'Some error occurred...';

describe('ErrorBoundary', () => {
  test('should render the fallback when an error occurs', () => {
    const FaultyComponent = () => {
      throw new Error(MESSAGE_ERROR);
    };
    const fallbackUI = <div role='alert'>An error occurred. Please try again later.</div>;
    render(
      <ErrorBoundary fallback={fallbackUI}>
        <FaultyComponent />
      </ErrorBoundary>,
    );
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveTextContent('An error occurred. Please try again later');
  });

  test('should render the children when no error occurs', () => {
    const TestComponent = () => <div>{MESSAGE_OK}</div>;
    render(
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <TestComponent />
      </ErrorBoundary>,
    );
    const testComponent = screen.getByText(MESSAGE_OK);
    expect(testComponent).toBeInTheDocument();
    const alertElement = screen.queryByRole('alert');
    expect(alertElement).not.toBeInTheDocument();
  });
});
