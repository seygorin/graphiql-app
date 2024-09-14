import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { errorNotifyMessage } from 'utils/notifyMessage';
import CodeEditor from './CodeEditor';

vi.mock('@uiw/react-codemirror', () => ({
  default: ({
    value,
    onChange,
    placeholder,
    readOnly,
  }: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    readOnly?: boolean;
  }) => (
    <textarea
      data-testid='codemirror'
      value={value}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  ),
}));
vi.mock('utils/notifyMessage', () => ({
  errorNotifyMessage: vi.fn(),
}));

describe('CodeEditor', () => {
  it('renders CodeEditor component', () => {
    render(<CodeEditor value='' onChange={() => {}} />);
    expect(screen.getByTestId('codemirror')).toBeInTheDocument();
  });

  it('calls onChange when text is entered', () => {
    const mockOnChange = vi.fn();
    render(<CodeEditor value='' onChange={mockOnChange} />);

    const textarea = screen.getByTestId('codemirror');
    fireEvent.change(textarea, { target: { value: 'new value' } });

    expect(mockOnChange).toHaveBeenCalledWith('new value');
  });

  it('displays placeholder when provided', () => {
    const placeholder = 'Enter code here';
    render(<CodeEditor value='' onChange={() => {}} placeholder={placeholder} />);

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('formats JSON when format button is clicked', async () => {
    const mockOnChange = vi.fn();
    const initialValue = '{"key": "value"}';
    render(<CodeEditor value={initialValue} onChange={mockOnChange} />);

    const formatButton = screen.getByRole('button');
    fireEvent.click(formatButton);

    expect(mockOnChange).toHaveBeenCalledWith('{"key":"value"}');
  });

  it('formats GraphQL when format button is clicked', async () => {
    const mockOnChange = vi.fn();
    const initialValue = 'query { user { name } }';
    render(<CodeEditor value={initialValue} onChange={mockOnChange} isGraphQL />);

    const formatButton = screen.getByRole('button');
    fireEvent.click(formatButton);

    expect(mockOnChange).toHaveBeenCalledWith('query { user { name } }');
  });
  it('toggles JSON formatting when format button is clicked multiple times', () => {
    const mockOnChange = vi.fn();
    const initialValue = '{"key": "value"}';
    render(<CodeEditor value={initialValue} onChange={mockOnChange} />);

    const formatButton = screen.getByRole('button');
    fireEvent.click(formatButton);
    expect(mockOnChange).toHaveBeenCalledWith('{"key":"value"}');

    fireEvent.click(formatButton);
    expect(mockOnChange).toHaveBeenCalledWith('{\n  "key": "value"\n}');
  });

  it('toggles GraphQL formatting when format button is clicked multiple times', () => {
    const mockOnChange = vi.fn();
    const initialValue = 'query { user { name } }';
    render(<CodeEditor value={initialValue} onChange={mockOnChange} isGraphQL />);

    const formatButton = screen.getByRole('button');
    fireEvent.click(formatButton);
    expect(mockOnChange).toHaveBeenCalledWith('query { user { name } }');

    fireEvent.click(formatButton);
    expect(mockOnChange).toHaveBeenCalledWith('query {\n  user {\n    name\n  }\n}');
  });

  it('handles invalid JSON formatting', () => {
    const mockOnChange = vi.fn();
    const initialValue = '{"key": "value",}';
    render(<CodeEditor value={initialValue} onChange={mockOnChange} />);

    const formatButton = screen.getByRole('button');
    fireEvent.click(formatButton);

    expect(errorNotifyMessage).toHaveBeenCalledWith('Failed to format code');
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('handles invalid GraphQL formatting', () => {
    const mockOnChange = vi.fn();
    const initialValue = 'query { user { name }';
    render(<CodeEditor value={initialValue} onChange={mockOnChange} isGraphQL />);

    const formatButton = screen.getByRole('button');
    fireEvent.click(formatButton);

    expect(mockOnChange).toHaveBeenCalledWith('query { user { name }');
  });

  it('applies correct styling to format button', () => {
    render(<CodeEditor value='' onChange={() => {}} />);
    const formatButton = screen.getByRole('button');
    expect(formatButton).toHaveStyle({
      position: 'absolute',
      top: '8px',
      right: '8px',
      zIndex: 1,
    });
  });
});
