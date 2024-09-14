import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RequestBodyEditor from './RequestBodyEditor';

vi.mock('components/CollapsibleCodeEditor', () => ({
  default: ({ title, value, onChange }) => (
    <div data-testid='collapsible-code-editor'>
      <h3>{title}</h3>
      <textarea
        data-testid='request-body-textarea'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  ),
}));

describe('RequestBodyEditor', () => {
  const mockOnRequestBodyChange = vi.fn();
  const mockT = vi.fn((key) => key);

  it('renders RequestBodyEditor component', () => {
    render(
      <RequestBodyEditor requestBody='' onRequestBodyChange={mockOnRequestBodyChange} t={mockT} />,
    );
    expect(screen.getByTestId('collapsible-code-editor')).toBeInTheDocument();
    expect(screen.getByText('restful.requestBody')).toBeInTheDocument();
  });

  it('displays the provided request body', () => {
    const requestBody = '{"key": "value"}';
    render(
      <RequestBodyEditor
        requestBody={requestBody}
        onRequestBodyChange={mockOnRequestBodyChange}
        t={mockT}
      />,
    );
    expect(screen.getByTestId('request-body-textarea')).toHaveValue(requestBody);
  });

  it('calls onRequestBodyChange when request body is modified', () => {
    render(
      <RequestBodyEditor requestBody='' onRequestBodyChange={mockOnRequestBodyChange} t={mockT} />,
    );
    const textarea = screen.getByTestId('request-body-textarea');
    fireEvent.change(textarea, { target: { value: '{"newKey": "newValue"}' } });
    expect(mockOnRequestBodyChange).toHaveBeenCalledWith('{"newKey": "newValue"}');
  });

  it('uses the correct translation key for the title', () => {
    render(
      <RequestBodyEditor requestBody='' onRequestBodyChange={mockOnRequestBodyChange} t={mockT} />,
    );
    expect(mockT).toHaveBeenCalledWith('restful.requestBody');
  });
});
