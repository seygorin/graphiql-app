import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import DynamicClientPage from '../app/[locale]/[method]/[[...params]]/page';

vi.mock('next-intl/server', () => ({
  unstable_setRequestLocale: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

vi.mock('components/GraphiQLClient/GraphiQLClient', () => ({
  __esModule: true,
  default: () => <div data-testid='graphiql-client'>GraphiQLClient</div>,
}));

vi.mock('components/RESTfulClient/RESTfulClient', () => ({
  __esModule: true,
  default: () => <div data-testid='restful-client'>RESTfulClient</div>,
}));

vi.mock('../../../../shared/consts/paths', () => ({
  VALID_LOCALES: ['en', 'fr'],
  VALID_METHODS: ['GRAPHQL', 'REST'],
}));

describe('DynamicClientPage', () => {
  it('calls notFound for invalid locale', () => {
    render(<DynamicClientPage params={{ locale: 'invalid', method: 'GRAPHQL' }} />);
    expect(notFound).toHaveBeenCalled();
  });

  it('calls notFound for invalid method', () => {
    render(<DynamicClientPage params={{ locale: 'en', method: 'INVALID' }} />);
    expect(notFound).toHaveBeenCalled();
  });

  it('calls unstable_setRequestLocale with correct locale', () => {
    render(<DynamicClientPage params={{ locale: 'en', method: 'GRAPHQL' }} />);
    expect(unstable_setRequestLocale).toHaveBeenCalledWith('en');
  });
});
