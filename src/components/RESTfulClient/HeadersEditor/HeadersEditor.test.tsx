import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HeadersEditor from './HeadersEditor';

vi.mock('components/CollapsibleCodeEditor', () => ({
  default: ({ title, value, onChange }) => (
    <div data-testid='collapsible-code-editor'>
      <h3>{title}</h3>
      <textarea
        data-testid='headers-textarea'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  ),
}));

describe('HeadersEditor', () => {
  const mockOnHeadersChange = vi.fn();
  const mockT = vi.fn((key) => key);

  it('renders HeadersEditor component', () => {
    render(<HeadersEditor headers='' onHeadersChange={mockOnHeadersChange} t={mockT} />);
    expect(screen.getByTestId('collapsible-code-editor')).toBeInTheDocument();
    expect(screen.getByText('restful.headers')).toBeInTheDocument();
  });

  it('displays the provided headers', () => {
    const headers = '{"Content-Type": "application/json"}';
    render(<HeadersEditor headers={headers} onHeadersChange={mockOnHeadersChange} t={mockT} />);
    expect(screen.getByTestId('headers-textarea')).toHaveValue(headers);
  });

  it('calls onHeadersChange when headers are modified', () => {
    render(<HeadersEditor headers='' onHeadersChange={mockOnHeadersChange} t={mockT} />);
    const textarea = screen.getByTestId('headers-textarea');
    fireEvent.change(textarea, { target: { value: '{"Authorization": "Bearer token"}' } });
    expect(mockOnHeadersChange).toHaveBeenCalledWith('{"Authorization": "Bearer token"}');
  });

  it('uses the correct translation key for the title', () => {
    render(<HeadersEditor headers='' onHeadersChange={mockOnHeadersChange} t={mockT} />);
    expect(mockT).toHaveBeenCalledWith('restful.headers');
  });
});
