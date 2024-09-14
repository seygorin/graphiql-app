import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import VariablesEditor from './VariablesEditor';

vi.mock('../../CollapsibleCodeEditor', () => ({
  default: ({ title, value, onChange }) => (
    <div data-testid='collapsible-code-editor'>
      <h3>{title}</h3>
      <textarea
        data-testid='variables-textarea'
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
      />
    </div>
  ),
}));

describe('VariablesEditor', () => {
  const mockOnVariablesChange = vi.fn();
  const mockT = vi.fn((key: string) => key);

  it('renders VariablesEditor with correct props', () => {
    render(
      <VariablesEditor
        variables='{"key": "value"}'
        onVariablesChange={mockOnVariablesChange}
        t={mockT}
      />,
    );

    expect(screen.getByTestId('collapsible-code-editor')).toBeInTheDocument();
    expect(screen.getByText('restful.variables')).toBeInTheDocument();
    expect(screen.getByTestId('variables-textarea')).toHaveValue('{"key": "value"}');
  });

  it('calls onVariablesChange when input changes', () => {
    render(<VariablesEditor variables='' onVariablesChange={mockOnVariablesChange} t={mockT} />);

    const textarea = screen.getByTestId('variables-textarea');
    fireEvent.change(textarea, { target: { value: '{"newKey": "newValue"}' } });

    expect(mockOnVariablesChange).toHaveBeenCalledWith('{"newKey": "newValue"}');
  });

  it('passes correct translation key to t function', () => {
    render(<VariablesEditor variables='' onVariablesChange={mockOnVariablesChange} t={mockT} />);

    expect(mockT).toHaveBeenCalledWith('restful.variables');
  });

  it('updates variables value when prop changes', () => {
    const { rerender } = render(
      <VariablesEditor
        variables='{"key": "value"}'
        onVariablesChange={mockOnVariablesChange}
        t={mockT}
      />,
    );

    expect(screen.getByTestId('variables-textarea')).toHaveValue('{"key": "value"}');

    rerender(
      <VariablesEditor
        variables='{"newKey": "newValue"}'
        onVariablesChange={mockOnVariablesChange}
        t={mockT}
      />,
    );

    expect(screen.getByTestId('variables-textarea')).toHaveValue('{"newKey": "newValue"}');
  });
});
