import { render, screen } from '@testing-library/react';
import { User } from 'firebase/auth';
import { describe, expect, test, vi } from 'vitest';
import stringAvatar from 'utils/getStringAvatar';
import AvatarUser from './Avatar';

vi.mock('utils/withUser', () => ({
  default: (Component: React.FC) => Component,
}));

vi.mock('utils/getStringAvatar', () => ({
  default: vi.fn(),
}));

describe('Avatar', () => {
  test('renders with user', () => {
    (stringAvatar as vi.Mock).mockReturnValue({ children: 'JD' });

    render(<AvatarUser user={{ displayName: 'John Doe', email: 'john@example.com' } as User} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  test('renders without user', () => {
    render(<AvatarUser />);
    const avatar = screen.queryByText('JD');
    expect(avatar).toBeNull();
  });

  test('renders with user and name', () => {
    (stringAvatar as vi.Mock).mockReturnValue({ children: 'JD' });

    render(
      <AvatarUser
        user={{ displayName: 'John Doe', email: 'john@example.com' } as User}
        name='Jane Doe'
      />,
    );
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  test('renders with user and email', () => {
    (stringAvatar as vi.Mock).mockReturnValue({ children: 'JD' });

    render(<AvatarUser user={{ displayName: null, email: 'john@example.com' } as User} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });
});
