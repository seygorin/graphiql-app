import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import withAuth from 'utils/withAuth';
import QeurryLayout from '../app/[locale]/restful/layout';

vi.mock('components/CustomDashboardTabs', () => ({
  default: () => <div data-testid='custom-dashboard-tabs'>CustomDashboardTabs</div>,
}));

vi.mock('utils/withAuth', () => ({
  default: vi.fn((Component: React.ComponentType) => Component),
}));

describe('QeurryLayout', () => {
  it('renders CustomDashboardTabs', () => {
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

  it('applies withAuth HOC', () => {
    expect(withAuth).toHaveBeenCalledWith(expect.any(Function));
  });
});
