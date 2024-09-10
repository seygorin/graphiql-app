import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import React from 'react';
import GraphiQLClient from 'components/GraphiQLClient/GraphiQLClient';
import RESTfulClient from 'components/RESTfulClient/RESTfulClient';
import { VALID_LOCALES, VALID_METHODS } from '../../../../shared/consts/paths';

type Props = {
  params: { locale: string; method: string; params?: string[] };
};

export default function DynamicClientPage({ params: { locale, method } }: Props) {
  if (!VALID_LOCALES.includes(locale) || !VALID_METHODS.includes(method)) {
    notFound();
  }

  unstable_setRequestLocale(locale);

  if (method === 'GRAPHQL') {
    return <GraphiQLClient />;
  }

  return <RESTfulClient />;
}

export function generateStaticParams() {
  return VALID_LOCALES.flatMap((locale) =>
    VALID_METHODS.map((method) => ({
      locale,
      method,
    })),
  );
}
