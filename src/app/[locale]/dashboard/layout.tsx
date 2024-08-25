'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Box, Container, Tab, Tabs } from '@mui/material';

export type DashboardLayoutProps = Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>;

const DashboardLayout = ({ children, params: { locale } }: DashboardLayoutProps) => {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <Container maxWidth="lg">
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={pathname} aria-label="dashboard tabs">
          <Tab
            label={t('dashboard.restful')}
            value={`/${locale}/dashboard/restful`}
            component={Link}
            href={`/${locale}/dashboard/restful`}
          />
          <Tab
            label={t('dashboard.graphiql')}
            value={`/${locale}/dashboard/graphiql`}
            component={Link}
            href={`/${locale}/dashboard/graphiql`}
          />
          <Tab
            label={t('dashboard.history')}
            value={`/${locale}/dashboard/history`}
            component={Link}
            href={`/${locale}/dashboard/history`}
          />
        </Tabs>
      </Box>
      {children}
    </Container>
  );
};

export default DashboardLayout;
