import { useTranslations } from 'next-intl';
import { fireEvent, render, screen } from '@testing-library/react';
import { User } from 'firebase/auth';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { signOutUser } from '../../lib/auth';
import SignOutButton from './SignOutButton';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));

vi.mock('../../lib/auth', () => ({
  signOutUser: vi.fn(),
}));

vi.mock('@mui/material/Avatar', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('@mui/material/Button', () => ({
  default: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

vi.mock('@mui/material/Divider', () => ({
  default: () => <div>Divider</div>,
}));

vi.mock('@mui/material/Stack', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('@mui/icons-material/Logout', () => ({
  default: () => <div>LogoutIcon</div>,
}));

vi.mock('utils/getStringAvatar', () => ({
  default: (name: string) => ({ children: name }),
}));

describe('SignOutButton', () => {
  let user: User | undefined;
  let name: string | null | undefined;
  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders with user display name', () => {
    user = { displayName: 'John Doe', email: 'john@example.com' } as User;
    render(<SignOutButton user={user} name={name} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('header.logout')).toBeInTheDocument();
  });

  test('renders with user email if no display name', () => {
    user = { email: 'john@example.com' } as User;
    render(<SignOutButton user={user} name={name} />);

    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('header.logout')).toBeInTheDocument();
  });

  test('calls signOutUser on button click', () => {
    user = { displayName: 'John Doe', email: 'john@example.com' } as User;
    render(<SignOutButton user={user} name={name} />);

    fireEvent.click(screen.getByText('header.logout'));
    expect(signOutUser).toHaveBeenCalled();
  });
});
