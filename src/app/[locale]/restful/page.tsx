import { unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';
import RESTfulClient from 'components/RESTfulClient/RESTfulClient';

type Props = {
  params: { locale: string };
};

export default function RESTfulPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  return <RESTfulClient />;
}
