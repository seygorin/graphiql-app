import React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CustomDashboardTabs from './CustomDashboardTabs';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}));

vi.mock('@mui/material', () => {
  const actual = vi.importActual('@mui/material');
  return {
    ...actual,
    useMediaQuery: vi.fn(() => false),
    useTheme: () => ({
      breakpoints: {
        down: () => vi.fn(),
      },
    }),
  };
});

describe('CustomDashboardTabs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all tabs with correct labels', () => {
    render(<CustomDashboardTabs />);

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);

    const expectedLabels = ['dashboard.restful', 'dashboard.graphiql', 'dashboard.history'];
    tabs.forEach((tab, index) => {
      expect(tab).toHaveTextContent(expectedLabels[index]);
    });
  });
});
