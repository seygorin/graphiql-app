'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Box, Container, Tab, Tabs } from '@mui/material';
import useTranslation from 'i18n/client';
import { LanguageType } from 'i18n/settings';

export type DashboardLayoutProps = Readonly<{
  children: React.ReactNode;
  params: { lng: LanguageType };
}>;

const DashboardLayout = ({ children, params: { lng } }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const { t } = useTranslation(lng);

  return (
    <Container maxWidth="lg">
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={pathname} aria-label="dashboard tabs">
          <Tab
            label={t('dashboard.restful')}
            value={`/${lng}/dashboard/restful`}
            component={Link}
            href={`/${lng}/dashboard/restful`}
          />
          <Tab
            label={t('dashboard.graphiql')}
            value={`/${lng}/dashboard/graphiql`}
            component={Link}
            href={`/${lng}/dashboard/graphiql`}
          />
          <Tab
            label={t('dashboard.history')}
            value={`/${lng}/dashboard/history`}
            component={Link}
            href={`/${lng}/dashboard/history`}
          />
        </Tabs>
      </Box>
      {children}
    </Container>
  );
};

export default DashboardLayout;
