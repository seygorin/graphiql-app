import React from 'react';
import RESTfulClient from 'components/RESTfulClient';
import { LanguageType } from 'i18n/settings';

export type RESTfulPageProps = Readonly<{
  params: { lng: LanguageType };
}>;

const RESTfulPage = ({ params: { lng } }: RESTfulPageProps) => {
  return <RESTfulClient lng={lng} />;
};

export default RESTfulPage;
