import { render, screen } from '@testing-library/react';
import { User } from 'firebase/auth';
import { describe, expect, test, vi } from 'vitest';
import Avatar from './Avatar';

vi.mock('utils/withUser', () => ({
  default: (Component: React.FC) => Component,
}));

describe('Avatar', () => {
  test('renders with user', () => {
    render(<Avatar user={{ displayName: 'John Doe', email: 'john@example.com' } as User} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  test('renders without user', () => {
    render(<Avatar />);
    const avatar = screen.queryByText('JD');
    expect(avatar).toBeNull();
  });
});
