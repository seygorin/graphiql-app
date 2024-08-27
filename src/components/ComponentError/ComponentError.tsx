'use client';

import { useTranslations } from 'next-intl';
import { Box, Container, Link, Typography } from '@mui/material';

function Error({ error }: { error?: Error }): JSX.Element {
  const t = useTranslations();

  return (
    <Container component="main" maxWidth="md">
      <Box padding={8} textAlign="center" display="flex" flexDirection="column">
        <Typography variant="h5" color="secondary.main">
          {t('error.message')}
        </Typography>
        <Typography variant="h5" color="secondary.main">
          {error?.message ? error.message : t('error.description')}
        </Typography>
        <Link color="secondary.main" variant="h5" href="/" sx={{ paddingTop: 10 }}>
          {t('error.link')}
        </Link>
      </Box>
    </Container>
  );
}
export default Error;
