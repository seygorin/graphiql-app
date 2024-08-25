'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Box, Link, Stack, Tab, Tabs, Typography } from '@mui/material';
import { User } from 'firebase/auth';
import SignInButton from 'components/SignInButton';
import SignUpButton from 'components/SignUpButton';
import withUser from 'utils/withUser';

interface IProps {
  user?: User | null;
}

const Main: React.FC<IProps> = ({ user }) => {
  const t = useTranslations();
  const locale = useLocale();

  if (user) {
    return (
      <Box display="flex" paddingTop={16} gap={8} flexDirection="column">
        <Typography variant="h3" textAlign="center">
          {t('main.welcomeUser', { user: user.displayName || user.email })}
        </Typography>
        <Stack direction="row" gap={2} alignSelf="center" justifyContent="center">
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs aria-label="dashboard tabs">
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
