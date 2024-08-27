'use client';

import { useLocale, useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { Box, Link, Stack, Tab, Tabs, Typography } from '@mui/material';
import { User } from 'firebase/auth';
import SignInButton from 'components/SignInButton';
import SignUpButton from 'components/SignUpButton';
import withUser from 'utils/withUser';
import ROUTES from '../../shared/types/types';

interface IProps {
  user?: User | null;
  name?: string | null;
}

const Main: React.FC<IProps> = ({ user, name }) => {
  const t = useTranslations();
  const locale = useLocale();
  const [value, setValue] = useState(`/${locale}${ROUTES.RESTFUL}`);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (user) {
    return (
      <Box display="flex" paddingTop={16} gap={8} flexDirection="column">
        <Typography variant="h3" textAlign="center">
          {t('main.welcomeUser', { user: name || user.displayName || user.email })}
        </Typography>
        <Stack direction="row" gap={2} alignSelf="center" justifyContent="center">
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={value} onChange={handleChange} aria-label="dashboard tabs">
              <Tab
                label={t('dashboard.restful')}
                value={`/${locale}${ROUTES.RESTFUL}`}
                component={Link}
                href={`/${locale}${ROUTES.RESTFUL}`}
              />
              <Tab
                label={t('dashboard.graphiql')}
                value={`/${locale}${ROUTES.GRAPHIQL}`}
                component={Link}
                href={`/${locale}${ROUTES.GRAPHIQL}`}
              />
              <Tab
                label={t('dashboard.history')}
                value={`/${locale}${ROUTES.HISTORY}`}
                component={Link}
                href={`/${locale}${ROUTES.HISTORY}`}
              />
            </Tabs>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <Box display="flex" paddingTop={16} gap={8} flexDirection="column">
      <Typography variant="h1" textAlign="center">
        {t('main.welcome')}
      </Typography>
      <Stack direction="row" gap={2} alignSelf="center" justifyContent="center">
        <SignInButton />
        <SignUpButton />
      </Stack>
    </Box>
  );
};

export default withUser(Main);
