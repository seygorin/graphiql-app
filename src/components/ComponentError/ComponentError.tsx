'use client';

import { useTranslations } from 'next-intl';
import { Box, Container, Link, Typography } from '@mui/material';

function Error({ error }: { error?: Error }): JSX.Element {
  const t = useTranslations();

  return (
    <Container component="main" maxWidth="md">
      <Box padding={16} textAlign="center" display="flex" flexDirection="column">
        <Typography variant="h2" color="error">
          {t('error.message')}
        </Typography>
        <Typography variant="h4" color="error">
          {error?.message ? error.message : t('error.description')}
        </Typography>
        <Link href="/" variant="h4" marginTop={8}>
          {t('error.link')}
        </Link>
      </Box>
    </Container>
  );
}
export default Error;
