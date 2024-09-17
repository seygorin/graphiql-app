import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import { Box, Link } from '@mui/material';
import ROUTES from '../../shared/types/types';
import { genStyles } from '../../styles/genStyles';
import theme, { ADDITION_COLOR } from '../../theme/theme';

const STYLES = genStyles({
  wrapper: {
    borderColor: 'info.main',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    fontSize: { md: '1.2rem', sm: '1.2rem', xs: '1.2rem' },
    fontWeight: 400,
    [theme.breakpoints.down('sm')]: { flexDirection: 'column' },
  },
  link: {
    margin: '0 auto',
    border: 1.5,
    borderRadius: 10,
    py: { md: 2.5, sm: 2, xs: 2 },
    px: { md: 6, sm: 4, xs: 5 },
    color: 'text.primary',
    textAlign: 'center',
    transition: '0.3s all ease',
    '&:hover': {
      backgroundColor: 'text.primary',
      color: ADDITION_COLOR.textFoo,
      textDecoration: 'none',
    },
  },
});

const CustomDashboardTabs: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <Box sx={STYLES.wrapper}>
      <Link sx={STYLES.link} href={`/${locale}${ROUTES.RESTFUL}`}>
        {t('dashboard.restful')}
      </Link>
      <Link sx={STYLES.link} href={`/${locale}${ROUTES.GRAPHIQL}`}>
        {t('dashboard.graphiql')}
      </Link>
      <Link sx={STYLES.link} href={`/${locale}${ROUTES.HISTORY}`}>
        {t('dashboard.history')}
      </Link>
    </Box>
  );
};

export default CustomDashboardTabs;
