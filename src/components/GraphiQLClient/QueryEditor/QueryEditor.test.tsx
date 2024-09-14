import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import QueryEditor from './QueryEditor';

vi.mock('../../CodeEditor', () => ({
  default: ({ value, onChange, placeholder }) => (
    <textarea
      data-testid='code-editor'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  ),
}));

describe('QueryEditor', () => {
  const mockOnQueryChange = vi.fn();
  const mockT = vi.fn((key) => key);

  it('renders QueryEditor component', () => {
    render(<QueryEditor query='' onQueryChange={mockOnQueryChange} t={mockT} />);
    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
  });

  it('passes correct props to CodeEditor for GraphQL', () => {
    render(<QueryEditor query='query { test }' onQueryChange={mockOnQueryChange} t={mockT} />);
    const codeEditor = screen.getByTestId('code-editor');
    expect(codeEditor).toHaveValue('query { test }');
    expect(codeEditor).toHaveAttribute('placeholder', 'graphiql.queryPlaceholder');
  });

  it('passes correct props to CodeEditor for REST', () => {
    render(
      <QueryEditor
        query='{"key": "value"}'
        onQueryChange={mockOnQueryChange}
        t={mockT}
        isGraphQL={false}
      />,
    );
    const codeEditor = screen.getByTestId('code-editor');
    expect(codeEditor).toHaveValue('{"key": "value"}');
    expect(codeEditor).toHaveAttribute('placeholder', 'restful.bodyPlaceholder');
  });

  it('calls onQueryChange when CodeEditor value changes', () => {
    render(<QueryEditor query='' onQueryChange={mockOnQueryChange} t={mockT} />);
    const codeEditor = screen.getByTestId('code-editor');
    fireEvent.change(codeEditor, { target: { value: 'new query' } });
    expect(mockOnQueryChange).toHaveBeenCalledWith('new query');
  });

  it('uses correct translation key based on isGraphQL prop', () => {
    render(<QueryEditor query='' onQueryChange={mockOnQueryChange} t={mockT} />);
    expect(mockT).toHaveBeenCalledWith('graphiql.queryPlaceholder');

    render(<QueryEditor query='' onQueryChange={mockOnQueryChange} t={mockT} isGraphQL={false} />);
    expect(mockT).toHaveBeenCalledWith('restful.bodyPlaceholder');
  });
});
