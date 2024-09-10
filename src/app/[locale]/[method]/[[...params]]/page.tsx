import { unstable_setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import React from 'react';
import { VALID_LOCALES, VALID_METHODS } from '../../../../shared/consts/paths';

const GraphiQLClient = dynamic(() => import('components/GraphiQLClient/GraphiQLClient'), {
  ssr: false,
});
const RESTfulClient = dynamic(() => import('components/RESTfulClient/RESTfulClient'), {
  ssr: false,
});

type Props = {
  params: { locale: string; method: string };
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
