import { unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';
import RESTfulClient from 'components/RESTfulClient/RESTfulClient';

type Props = {
  params: { locale: string; method: string; params?: string[] };
};

export default function DynamicRESTfulClientPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  return <RESTfulClient />;
}

export function generateStaticParams() {
  const locales = ['en', 'ru'];
  const methods = ['GET', 'POST'];

  return locales.flatMap((locale) =>
    methods.map((method) => ({
      locale,
      method,
    })),
  );
}
