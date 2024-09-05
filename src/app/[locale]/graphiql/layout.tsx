'use client';

import React from 'react';
import CustomDashboardTabs from 'components/CustomDashboardTabs';

export type QeurryLayoutProps = Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>;

const QeurryLayout = ({ children }: QeurryLayoutProps) => {
  return (
    <>
      <CustomDashboardTabs size='small' />
      {children}
    </>
  );
};

export default QeurryLayout;
