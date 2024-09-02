'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Box, Container, Tab, Tabs } from '@mui/material';

export type RestfulLayoutProps = Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>;

const RestfulLayout = ({ children, params: { locale } }: RestfulLayoutProps) => {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <Container maxWidth="lg">
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={pathname} aria-label="restful tabs">
          <Tab
            label={t('dashboard.restful')}
            value={`/${locale}/restful`}
            component={Link}
            href={`/${locale}/restful`}
          />
          <Tab
            label={t('dashboard.graphiql')}
            value={`/${locale}/graphiql`}
            component={Link}
            href={`/${locale}/graphiql`}
          />
          <Tab
            label={t('dashboard.history')}
            value={`/${locale}/history`}
            component={Link}
            href={`/${locale}/history`}
          />
        </Tabs>
      </Box>
      {children}
    </Container>
  );
};

export default RestfulLayout;
