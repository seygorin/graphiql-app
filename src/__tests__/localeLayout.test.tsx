import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import LocaleLayout, { generateStaticParams } from '../app/[locale]/layout';

vi.mock('next/font/google', async () => {
  const actual = (await vi.importActual('next/font/google')) as object;
  return {
    ...actual,
    Inter: () => ({ className: 'inter-font' }),
    Roboto: () => ({
      style: { fontFamily: 'Roboto' },
      className: 'roboto-font',
    }),
  };
});

vi.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('next-intl/server', () => ({
  getMessages: vi.fn(() => Promise.resolve({})),
  unstable_setRequestLocale: vi.fn(),
}));

vi.mock('@mui/material', () => ({
  Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('@mui/material-nextjs/v14-appRouter', () => ({
  AppRouterCacheProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('@mui/material/styles', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('components/ComponentError/ComponentError', () => ({
  default: () => <div>ComponentError</div>,
}));

vi.mock('components/ErrorBoundary/ErrorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('components/Footer', () => ({
  default: () => <div>Footer</div>,
}));

vi.mock('components/Header', () => ({
  default: () => <div>Header</div>,
}));

vi.mock('components/ToastifyNotification', () => ({
  default: () => <div>ToastifyNotification</div>,
}));

vi.mock('i18n/config', () => ({
  locales: ['en', 'fr'],
}));

vi.mock('../theme/theme', () => ({
  default: {},
}));

describe('LocaleLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', async () => {
    const { getByText } = render(
      await LocaleLayout({
        children: <div>Test Child</div>,
        params: { locale: 'en' },
      }),
    );

    await waitFor(() => {
      expect(getByText('Test Child')).toBeInTheDocument();
      expect(getByText('Header')).toBeInTheDocument();
      expect(getByText('Footer')).toBeInTheDocument();
      expect(getByText('ToastifyNotification')).toBeInTheDocument();
    });
  });

  it('sets html lang attribute correctly', async () => {
    const { container } = render(
      await LocaleLayout({
        children: <div>Test Child</div>,
        params: { locale: 'fr' },
      }),
    );

    await waitFor(() => {
      expect(container.querySelector('html')).toHaveAttribute('lang', 'fr');
    });
  });

  it('sets correct title', async () => {
    render(
      await LocaleLayout({
        children: <div>Test Child</div>,
        params: { locale: 'en' },
      }),
    );

    await waitFor(() => {
      expect(document.title).toBe('EST/GraphiQL Client');
    });
  });

  it('applies Inter font class to body', async () => {
    const { container } = render(
      await LocaleLayout({
        children: <div>Test Child</div>,
        params: { locale: 'en' },
      }),
    );

    await waitFor(() => {
      expect(container.querySelector('body')).toHaveClass('inter-font');
    });
  });
});

describe('generateStaticParams', () => {
  it('returns correct params for all locales', () => {
    const params = generateStaticParams();
    expect(params).toEqual([{ locale: 'en' }, { locale: 'fr' }]);
  });
});
