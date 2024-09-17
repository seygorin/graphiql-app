import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { useMemo } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { VALID_GRAPHQL, VALID_REST } from '../../shared/consts/paths';
import ROUTES from '../../shared/types/types';
import { genStyles } from '../../styles/genStyles';

const STYLES = genStyles({
  wrapper: {
    m: '0 auto',
    display: 'flex',
    justifyContent: 'center',
  },
});

export default function NavTabs() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const value = useMemo(() => {
    if (VALID_REST.some((method) => pathname.includes(method)))
      return `/${locale}${ROUTES.RESTFUL}`;
    if (VALID_GRAPHQL.some((method) => pathname.includes(method)))
      return `/${locale}${ROUTES.GRAPHIQL}`;
    return pathname;
  }, [locale, pathname]);

  const tabs = React.useMemo(
    () => [
      { label: t('dashboard.restful'), href: `/${locale}${ROUTES.RESTFUL}` },
      { label: t('dashboard.graphiql'), href: `/${locale}${ROUTES.GRAPHIQL}` },
      { label: t('dashboard.history'), href: `/${locale}${ROUTES.HISTORY}` },
    ],
    [t, locale],
  );

  return (
    <Box sx={STYLES.wrapper}>
      <Tabs
        value={value}
        role='navigation'
        orientation={isMobile ? 'vertical' : 'horizontal'}
        variant={isMobile ? 'fullWidth' : 'standard'}
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          '& .MuiTabs-flexContainer': {
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { md: 'center' },
          },
          width: { xs: '100%', md: 'auto' },
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.href}
            component='a'
            label={tab.label}
            href={tab.href}
            value={tab.href}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              width: { xs: '100%', md: 'auto' },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
