import { getTranslations } from 'next-intl/server';
import { Box, Container, Link, Typography } from '@mui/material';

export default async function NotFoundPage() {
  const t = await getTranslations();
  return (
    <Container component="main" maxWidth="md">
      <Box display="flex" paddingTop={16} gap={2} flexDirection="column">
        <Typography variant="h3" textAlign="center">
          {t('notfound.title')}
        </Typography>
        <Typography variant="h5" textAlign="center">
          {t('notfound.description')}
        </Typography>
        <Link marginTop={8} variant="h4" href="/" textAlign="center">
          {t('notfound.link')}
        </Link>
      </Box>
    </Container>
  );
}
