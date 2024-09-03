import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import { Box, Link, Stack } from '@mui/material';
import ROUTES from '../../shared/types/types';

interface CustomDashboardTabsProps {
  size?: 'small' | 'large';
}

const CustomDashboardTabs: React.FC<CustomDashboardTabsProps> = ({ size = 'large' }) => {
  const t = useTranslations();
  const locale = useLocale();

  const tabStyle =
    size === 'large'
      ? { variant: 'h3' as const, pt: 6, p: '30px', gap: 11 }
      : { variant: 'h6' as const, pt: 2, p: '10px', gap: 4 };

  return (
    <Stack direction="row" alignSelf="center" justifyContent="center">
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'info.main',
          display: 'flex',
          ...tabStyle,
        }}
      >
        <Link
          variant={tabStyle.variant}
          sx={{ '&:hover': { color: 'primary.main' } }}
          href={`/${locale}${ROUTES.RESTFUL}`}
        >
          {t('dashboard.restful')}
        </Link>
        <Link
          variant={tabStyle.variant}
          sx={{ '&:hover': { color: 'primary.main' } }}
          href={`/${locale}${ROUTES.GRAPHIQL}`}
        >
          {t('dashboard.graphiql')}
        </Link>
        <Link
          variant={tabStyle.variant}
          sx={{ '&:hover': { color: 'primary.main' } }}
          href={`/${locale}${ROUTES.HISTORY}`}
        >
          {t('dashboard.history')}
        </Link>
      </Box>
    </Stack>
  );
};

export default CustomDashboardTabs;
