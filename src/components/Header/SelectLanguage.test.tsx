import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import SelectLanguage from './SelectLanguage';

vi.mock('next-intl', () => ({
  useLocale: vi.fn(),
  useTranslations: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

vi.mock('i18n/config', () => ({
  locales: ['en', 'ru'],
}));

vi.mock('../../utils/withUser', () => ({
  __esModule: true,
  default: (Component: React.FC) => (props: unknown) => (
    <Component {...props} user={{ uid: '123', email: 'test@example.com' }} name='Test User' />
  ),
}));

describe('SelectLanguage', () => {
  beforeEach(() => {
    (useTranslations as vi.Mock).mockReturnValue((key: string) => key);
    (useLocale as vi.Mock).mockReturnValue('en');
    (usePathname as vi.Mock).mockReturnValue('/current-path');
    (useRouter as vi.Mock).mockReturnValue({
      replace: vi.fn(),
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders the select language component', async () => {
    render(<SelectLanguage />);
    expect(await screen.getByRole('group')).toBeInTheDocument();
    expect(await screen.getByText('en')).toBeInTheDocument();
    expect(await screen.getByText('ru')).toBeInTheDocument();
  });

  test('handles language change', async () => {
    render(<SelectLanguage />);
    const enButton = screen.getByText('ru');
    fireEvent.click(enButton);
    expect(await useRouter().replace).toHaveBeenCalledWith('/ru/');
  });
});
