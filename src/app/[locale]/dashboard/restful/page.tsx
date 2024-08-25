import { unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';
import RESTfulClient from 'components/RESTfulClient';

type Props = {
  params: { locale: string };
};

const RESTfulPage: React.FC<Props> = ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  return <RESTfulClient />;
};

export default RESTfulPage;
