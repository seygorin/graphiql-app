import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import CollapsibleCodeEditor from './CollapsibleCodeEditor';

vi.mock('../CodeEditor', () => ({
  default: ({
    value,
    onChange,
    isGraphQL,
  }: {
    value: string;
    onChange: (value: string) => void;
    isGraphQL?: boolean;
  }) => (
    <textarea
      data-testid='code-editor'
      value={value}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
      data-is-graphql={isGraphQL ? 'true' : undefined}
    />
  ),
}));
describe('CollapsibleCodeEditor', () => {
  const mockOnChange = vi.fn();

  it('renders CollapsibleCodeEditor with correct title', () => {
    render(<CollapsibleCodeEditor title='Test Editor' value='' onChange={mockOnChange} />);

    expect(screen.getByText('Test Editor')).toBeInTheDocument();
  });

  it('expands and collapses when clicked', async () => {
    render(<CollapsibleCodeEditor title='Test Editor' value='' onChange={mockOnChange} />);

    const accordion = screen.getByRole('button', { name: 'Test Editor' });
    expect(screen.queryByTestId('code-editor')).not.toBeVisible();

    await userEvent.click(accordion);
    expect(screen.getByTestId('code-editor')).toBeVisible();

    await userEvent.click(accordion);
    expect(screen.queryByTestId('code-editor')).not.toBeVisible();
  });

  it('passes isGraphQL prop to CodeEditor', async () => {
    render(
      <CollapsibleCodeEditor title='GraphQL Editor' value='' onChange={mockOnChange} isGraphQL />,
    );

    const accordion = screen.getByRole('button', { name: 'GraphQL Editor' });
    await userEvent.click(accordion);

    const editor = screen.getByTestId('code-editor');
    expect(editor).toHaveAttribute('data-is-graphql', 'true');
  });
});
