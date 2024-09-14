import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CustomDashboardTabs from './CustomDashboardTabsMain';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

vi.mock('../../shared/types/types', () => ({
  default: {
    RESTFUL: '/restful',
    GRAPHIQL: '/graphiql',
    HISTORY: '/history',
  },
}));

vi.mock('../../styles/genStyles', () => ({
  genStyles: () => ({
    wrapper: {},
    link: {},
  }),
}));

vi.mock('../../theme/theme', () => ({
  default: {
    breakpoints: {
      down: () => {},
    },
  },
  ADDITION_COLOR: {
    textFoo: '#000000',
  },
}));

describe('CustomDashboardTabs', () => {
  it('renders CustomDashboardTabs component', () => {
    render(<CustomDashboardTabs />);
    expect(screen.getByText('dashboard.restful')).toBeInTheDocument();
    expect(screen.getByText('dashboard.graphiql')).toBeInTheDocument();
    expect(screen.getByText('dashboard.history')).toBeInTheDocument();
  });

  it('renders correct links with locale', () => {
    render(<CustomDashboardTabs />);
    const restfulLink = screen.getByRole('link', { name: 'dashboard.restful' });
    const graphiqlLink = screen.getByRole('link', { name: 'dashboard.graphiql' });
    const historyLink = screen.getByRole('link', { name: 'dashboard.history' });

    expect(restfulLink).toHaveAttribute('href', '/en/restful');
    expect(graphiqlLink).toHaveAttribute('href', '/en/graphiql');
    expect(historyLink).toHaveAttribute('href', '/en/history');
  });
});
