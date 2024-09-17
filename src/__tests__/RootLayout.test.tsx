import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RootLayout from '../app/layout';

describe('RootLayout Component', () => {
  it('renders children correctly', () => {
    const childText = 'Test Child Content';

    const { getByText } = render(
      <RootLayout>
        <div>{childText}</div>
      </RootLayout>,
    );

    expect(getByText(childText)).toBeInTheDocument();
  });
});
