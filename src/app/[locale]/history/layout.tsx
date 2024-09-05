'use client';

import React from 'react';
import { Container } from '@mui/material';
import CustomDashboardTabs from 'components/CustomDashboardTabs';

export type HistoryLayoutProps = Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>;

const HistoryLayout = ({ children }: HistoryLayoutProps) => {
  return (
    <Container maxWidth='lg'>
      <CustomDashboardTabs size='small' />
      {children}
    </Container>
  );
};

export default HistoryLayout;
