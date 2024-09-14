import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HistoryLayout from '../app/[locale]/history/layout';

vi.mock('@mui/material', () => ({
  Container: ({ children, maxWidth }: { children: React.ReactNode; maxWidth: string }) => (
    <div data-testid='mui-container' data-max-width={maxWidth}>
      {children}
    </div>
  ),
}));

vi.mock('components/CustomDashboardTabs', () => ({
  default: () => <div data-testid='custom-dashboard-tabs'>CustomDashboardTabs</div>,
}));

vi.mock('utils/withAuth', () => ({
  default: (Component: React.ComponentType) => Component,
}));

describe('HistoryLayout', () => {
  it('renders Container with correct maxWidth', () => {
    render(
      <HistoryLayout params={{ locale: 'en' }}>
        <div>Child content</div>
      </HistoryLayout>,
    );
    const container = screen.getByTestId('mui-container');
    expect(container).toHaveAttribute('data-max-width', 'lg');
  });

  it('renders CustomDashboardTabs', () => {
    render(
      <HistoryLayout params={{ locale: 'en' }}>
        <div>Child content</div>
      </HistoryLayout>,
    );
    expect(screen.getByTestId('custom-dashboard-tabs')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <HistoryLayout params={{ locale: 'en' }}>
        <div>Child content</div>
      </HistoryLayout>,
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('renders CustomDashboardTabs before children', () => {
    const { container } = render(
      <HistoryLayout params={{ locale: 'en' }}>
        <div>Child content</div>
      </HistoryLayout>,
    );
    const customDashboardTabs = screen.getByTestId('custom-dashboard-tabs');
    const childContent = screen.getByText('Child content');
    expect(container.firstChild).toContainElement(customDashboardTabs);
    expect(container.lastChild).toContainElement(childContent);
  });
});
