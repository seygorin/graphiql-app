'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';
import { User } from 'firebase/auth';
import SignInButton from 'components/SignInButton';
import SignUpButton from 'components/SignUpButton';
import withUser from 'utils/withUser';
import ROUTES from '../../shared/types/types';
import AboutUs from './AboutUs';

interface IProps {
  user?: User | null;
  name?: string | null;
}

const Main: React.FC<IProps> = ({ user, name }) => {
  const t = useTranslations();

  if (user) {
    return (
      <Box display='flex' pt={10} flexDirection='column'>
        <Box
          bgcolor='background.paper'
          borderRadius={1.5}
          py={11}
          sx={{ boxShadow: '0px 5px 7px 5px rgba(68, 68, 68, 0.04)' }}
        >
          <Typography variant='h2' textAlign='center' pb={3}>
            {t('main.welcomeUser', { user: name || user.displayName || user.email })}
          </Typography>

          <Stack direction='row' gap={5} alignSelf='center' justifyContent='center'>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'info.main',
                pt: 6,
                p: '30px',
                display: 'flex',
                gap: 11,
              }}
            >
              <Link
                variant='h3'
                sx={{ '&:hover': { color: 'primary.main' } }}
                href={ROUTES.RESTFUL}
              >
                {t('dashboard.restful')}
              </Link>

              <Link variant='h3' href={ROUTES.GRAPHIQL}>
                {t('dashboard.graphiql')}
              </Link>
              <Link variant='h3' href={ROUTES.HISTORY}>
                {t('dashboard.history')}
              </Link>
            </Box>
          </Stack>
        </Box>
        <AboutUs />
      </Box>
    );
  }

  return (
    <Box display='flex' gap={8} pt={18} flexDirection='column'>
      <Typography variant='h1' textAlign='center'>
        {t('main.welcome')}
      </Typography>
      <Stack direction='row' gap={2} alignSelf='center' justifyContent='center'>
        <SignInButton />
        <SignUpButton />
      </Stack>
    </Box>
  );
};

export default withUser(Main);
