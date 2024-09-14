import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import RequestForm from './RequestForm';

vi.mock('@mui/icons-material/Send', () => ({
  default: () => <div data-testid='send-icon' />,
}));

describe('RequestForm', () => {
  const defaultProps = {
    method: 'GET' as const,
    url: 'https://api.example.com',
    status: '200',
    isLoading: false,
    onMethodChange: vi.fn(),
    onUrlChange: vi.fn(),
    onSendRequest: vi.fn(),
    t: (key: string) => key,
  };

  it('renders RequestForm with correct initial values', () => {
    render(<RequestForm {...defaultProps} />);

    expect(screen.getByLabelText('restful.method')).toHaveTextContent('GET');
    expect(screen.getByPlaceholderText('restful.endpoint')).toHaveValue('https://api.example.com');
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByTestId('send-icon')).toBeInTheDocument();
  });

  it('calls onMethodChange when method is changed', async () => {
    const user = userEvent.setup();
    render(<RequestForm {...defaultProps} />);

    const select = screen.getByLabelText('restful.method');
    await user.click(select);
    const postOption = await screen.findByRole('option', { name: 'POST' });
    await user.click(postOption);

    expect(defaultProps.onMethodChange).toHaveBeenCalled();
  });

  it('calls onUrlChange when URL is changed', async () => {
    const user = userEvent.setup();
    render(<RequestForm {...defaultProps} />);

    const urlInput = screen.getByPlaceholderText('restful.endpoint');
    await user.type(urlInput, 'newapi');

    expect(defaultProps.onUrlChange).toHaveBeenCalled();
  });

  it('calls onSendRequest when send button is clicked', async () => {
    const user = userEvent.setup();
    render(<RequestForm {...defaultProps} />);

    const sendButton = screen.getByRole('button', { name: 'restful.sendRequest' });
    await user.click(sendButton);

    expect(defaultProps.onSendRequest).toHaveBeenCalled();
  });

  it('disables send button when isLoading is true', () => {
    render(<RequestForm {...defaultProps} isLoading />);

    const sendButton = screen.getByRole('button', { name: 'restful.sendRequest' });
    expect(sendButton).toBeDisabled();
  });

  it('renders success chip for status codes 200-299', () => {
    render(<RequestForm {...defaultProps} status='250' />);

    const chip = screen.getByText('250');
    const chipContainer = chip.closest('.MuiChip-root');
    expect(chipContainer).toHaveClass('MuiChip-colorSuccess');
  });

  it('renders error chip for status codes outside 200-299', () => {
    render(<RequestForm {...defaultProps} status='404' />);

    const chip = screen.getByText('404');
    const chipContainer = chip.closest('.MuiChip-root');
    expect(chipContainer).toHaveClass('MuiChip-colorError');
  });
});
