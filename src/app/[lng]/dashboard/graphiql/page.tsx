import React from 'react';
import GraphiQLClient from 'components/GraphiQLClient';
import { LanguageType } from 'i18n/settings';

export type GraphiQLPageProps = Readonly<{
  params: { lng: LanguageType };
}>;

const GraphiQLPage = ({ params: { lng } }: GraphiQLPageProps) => {
  return <GraphiQLClient lng={lng} />;
};

export default GraphiQLPage;
