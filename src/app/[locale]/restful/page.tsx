import { unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';
import RESTfulClient from 'components/RESTfulClient/RESTfulClient';

interface IProps {
  params: { locale: string };
}

const RESTfulPage: React.FC<IProps> = ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);

  return <RESTfulClient />;
};

export default RESTfulPage;
