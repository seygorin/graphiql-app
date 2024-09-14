import type { ImageProps } from 'next/image';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { User } from 'firebase/auth';
import { describe, expect, it, vi } from 'vitest';
import Main from './Main';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/image', () => ({
  default: (props: Omit<ImageProps, 'src'> & { src: string }) => (
    <div
      data-testid='next-image'
      data-src={props.src}
      data-alt={props.alt}
      data-width={props.width}
      data-priority={props.priority}
    />
  ),
}));

vi.mock('components/SignInButton', () => ({
  default: () => <button>Sign In</button>,
}));

vi.mock('components/SignUpButton', () => ({
  default: () => <button>Sign Up</button>,
}));

vi.mock('./AboutUs', () => ({
  default: () => <div data-testid='about-us'>About Us</div>,
}));

vi.mock('./CustomDashboardTabsMain', () => ({
  default: () => <div data-testid='custom-dashboard-tabs'>Custom Dashboard Tabs</div>,
}));

vi.mock('utils/withUser', () => ({
  default: (Component: React.ComponentType) => Component,
}));

vi.mock('./styles.main', () => ({
  STYLES: {
    background: {},
    info: {},
    infoContent: {},
    infoTitle: {},
    infoTitleName: {},
    infoText: {},
    infoImgWrapper: {},
    infoImg: {},
    imgScreenshot1: {},
    imgScreenshot2: {},
    imgScreenshot3: {},
    img: {},
    notAuth: {},
    notAuthTitle: {},
  },
}));

const mockUser: Partial<User> = {
  displayName: 'John Doe',
  email: 'john@example.com',
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  refreshToken: '',
  tenantId: null,
  delete: vi.fn(),
  getIdToken: vi.fn(),
  getIdTokenResult: vi.fn(),
  reload: vi.fn(),
  toJSON: vi.fn(),
  uid: '123456',
};

describe('Main', () => {
  it('renders welcome message for non-authenticated user', () => {
    render(<Main />);
    expect(screen.getByText('main.welcome')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('renders personalized welcome message for authenticated user', () => {
    render(<Main user={mockUser as User} />);
    expect(screen.getByText('main.welcomeUser,')).toBeInTheDocument();
    expect(screen.getByText('John Doe!')).toBeInTheDocument();
  });

  it('renders CustomDashboardTabsMain for authenticated user', () => {
    render(<Main user={{} as User} />);
    expect(screen.getByTestId('custom-dashboard-tabs')).toBeInTheDocument();
  });

  it('renders AboutUs component for authenticated user', () => {
    render(<Main user={{} as User} />);
    expect(screen.getByTestId('about-us')).toBeInTheDocument();
  });

  it('renders screenshots for authenticated user', () => {
    render(<Main user={{} as User} />);
    const images = screen.getAllByTestId('next-image');
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute('data-alt', 'screenshot1');
    expect(images[1]).toHaveAttribute('data-alt', 'screenshot2');
    expect(images[2]).toHaveAttribute('data-alt', 'screenshot3');
    expect(images[0]).toHaveAttribute('data-width', '400');
    expect(images[0]).toHaveAttribute('data-priority', 'true');
  });

  it('uses name prop if provided', () => {
    const user = { email: 'john@example.com' } as User;
    render(<Main user={user} name='Jane Doe' />);
    expect(screen.getByText('Jane Doe!')).toBeInTheDocument();
  });

  it('falls back to email if no name or displayName is provided', () => {
    const user = { email: 'john@example.com' } as User;
    render(<Main user={user} />);
    expect(screen.getByText('john@example.com!')).toBeInTheDocument();
  });
});
