'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';
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

  if (user) {
    return (
      <Box display="flex" paddingTop={16} gap={8} flexDirection="column">
        <Typography variant="h3" textAlign="center">
          {t('main.welcomeUser', { user: name || user.displayName || user.email })}
        </Typography>
        <Stack direction="row" gap={5} alignSelf="center" justifyContent="center">
          <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 3, display: 'flex', gap: 16 }}>
            <Link
              variant="h5"
              color="secondary.main"
              underline="hover"
              sx={{ '&:hover': { color: 'primary.main' } }}
              href={ROUTES.RESTFUL}
            >
              {t('dashboard.restful')}
            </Link>

            <Link
              variant="h5"
              color="secondary.main"
              underline="hover"
              sx={{ '&:hover': { color: 'primary.main' } }}
              href={ROUTES.GRAPHIQL}
            >
              {t('dashboard.graphiql')}
            </Link>
            <Link
              variant="h5"
              color="secondary.main"
              underline="hover"
              sx={{ '&:hover': { color: 'primary.main' } }}
              href={ROUTES.HISTORY}
            >
              {t('dashboard.history')}
            </Link>
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
