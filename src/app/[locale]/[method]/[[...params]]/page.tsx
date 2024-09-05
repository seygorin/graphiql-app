import { unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';
import GraphiQLClient from 'components/GraphiQLClient/GraphiQLClient';
import RESTfulClient from 'components/RESTfulClient/RESTfulClient';

type Props = {
  params: { locale: string; method: string; params?: string[] };
};

export default function DynamicClientPage({ params: { locale, method } }: Props) {
  unstable_setRequestLocale(locale);

  if (method === 'GRAPHQL') {
    return <GraphiQLClient />;
  }

  return <RESTfulClient />;
}

export function generateStaticParams() {
  const locales = ['en', 'ru'];
  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'GRAPHQL'];

  return locales.flatMap((locale) =>
    methods.map((method) => ({
      locale,
      method,
    })),
  );
}
