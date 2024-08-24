import React from 'react';
import HistoryComponent from 'components/HistoryComponent';
import { LanguageType } from 'i18n/settings';

export type HistoryPageProps = Readonly<{
  params: { lng: LanguageType };
}>;

const HistoryPage = ({ params: { lng } }: HistoryPageProps) => {
  return <HistoryComponent lng={lng} />;
};

export default HistoryPage;
