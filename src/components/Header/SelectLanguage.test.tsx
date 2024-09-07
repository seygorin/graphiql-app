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

// vi.mock('@mui/material', () => ({
//   FormControl: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
//   InputLabel: ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
//     <label htmlFor={htmlFor}>{children}</label>
//   ),
//   Select: ({
//     value,
//     onChange,
//     children,
//   }: {
//     value: string;
//     onChange: (e: SelectChangeEvent) => void;
//     children: React.ReactNode;
//   }) => (
//     <select value={value} onChange={(e) => onChange({ target: { value: e.target.value } })}>
//       {children}
//     </select>
//   ),
//   MenuItem: ({ value, children }: { value: string; children: React.ReactNode }) => (
//     <option value={value}>{children}</option>
//   ),
// }));

vi.mock('i18n/config', () => ({
  locales: ['en', 'ru'],
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

  test('renders the select language component', () => {
    render(<SelectLanguage />);
    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(screen.getByText('en')).toBeInTheDocument();
    expect(screen.getByText('ru')).toBeInTheDocument();
  });

  test('handles language change', () => {
    render(<SelectLanguage />);
    const enButton = screen.getByText('ru');
    fireEvent.click(enButton);
    expect(useRouter().replace).toHaveBeenCalledWith('/ru/');
  });
});
