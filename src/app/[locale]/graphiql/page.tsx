import { unstable_setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import React from 'react';

const GraphiQLClient = dynamic(() => import('components/GraphiQLClient/GraphiQLClient'), {
  ssr: false,
});

interface IProps {
  params: { locale: string };
}

const GraphiQLPage: React.FC<IProps> = ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);

  return <GraphiQLClient />;
};

export default GraphiQLPage;
