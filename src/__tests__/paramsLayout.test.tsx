import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import QeurryLayout from '../app/[locale]/[method]/[[...params]]/layout';

vi.mock('components/CustomDashboardTabs', () => ({
  default: () => <div data-testid='custom-dashboard-tabs'>CustomDashboardTabs</div>,
}));

vi.mock('next/font/google', () => ({
  Roboto: () => ({
    style: {
      fontFamily: 'Roboto, sans-serif',
    },
  }),
}));

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
  NextIntlClientProvider: ({ children }) => children,
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('utils/withAuth', () => ({
  default: (Component: React.ComponentType) => Component,
}));

describe('QeurryLayout', () => {
  const mockPush = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    (useTranslations as vi.Mock).mockReturnValue((key: string) => key);
    (useRouter as vi.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('renders CustomDashboardTabs', () => {
    (useAuthState as vi.Mock).mockReturnValue([null, false]);
    render(
      <QeurryLayout params={{ locale: 'en' }}>
        <div>Child content</div>
      </QeurryLayout>,
    );
    expect(screen.getByTestId('custom-dashboard-tabs')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <QeurryLayout params={{ locale: 'en' }}>
        <div>Child content</div>
      </QeurryLayout>,
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('renders CustomDashboardTabs before children', () => {
    const { container } = render(
      <QeurryLayout params={{ locale: 'en' }}>
        <div>Child content</div>
      </QeurryLayout>,
    );
    const customDashboardTabs = screen.getByTestId('custom-dashboard-tabs');
    const childContent = screen.getByText('Child content');
    expect(container.firstChild).toContainElement(customDashboardTabs);
    expect(container.lastChild).toContainElement(childContent);
  });
});
