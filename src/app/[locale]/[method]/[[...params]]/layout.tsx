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
      <CustomDashboardTabs />
      {children}
    </>
  );
};

export default QeurryLayout;
