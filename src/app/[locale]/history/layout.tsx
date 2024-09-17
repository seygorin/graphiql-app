'use client';

import React from 'react';
import { Container } from '@mui/material';
import CustomDashboardTabs from 'components/CustomDashboardTabs';
import withAuth from 'utils/withAuth';

export type HistoryLayoutProps = Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>;

const HistoryLayout = ({ children }: HistoryLayoutProps) => {
  return (
    <Container maxWidth='lg'>
      <CustomDashboardTabs />
      {children}
    </Container>
  );
};

export default withAuth(HistoryLayout);
