'use client';

import React from 'react';
import { Container } from '@mui/material';
import CustomDashboardTabs from 'components/CustomDashboardTabs';

export type RestfulLayoutProps = Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>;

const RestfulLayout = ({ children }: RestfulLayoutProps) => {
  return (
    <Container maxWidth='lg'>
      <CustomDashboardTabs size='small' />
      {children}
    </Container>
  );
};

export default RestfulLayout;
