import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ResponseViewer from './ResponseViewer';

vi.mock('@uiw/react-codemirror', () => ({
  default: ({ value }: { value: string }) => <pre data-testid='code-mirror'>{value}</pre>,
}));

vi.mock('@codemirror/view', () => ({
  EditorView: {
    theme: vi.fn(),
    lineWrapping: {},
  },
}));

vi.mock('@uiw/codemirror-extensions-langs', () => ({
  langs: {
    json: vi.fn(),
  },
}));

vi.mock('components/Loader', () => ({
  default: () => <div data-testid='loader'>Loading...</div>,
}));

describe('ResponseViewer', () => {
  it('renders loader when isLoading is true', () => {
    render(<ResponseViewer isLoading response={null} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders nothing when response is null', () => {
    const { container } = render(<ResponseViewer isLoading={false} response={null} />);
    expect(container.firstChild).toBeNull();
  });
});
