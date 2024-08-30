import { getTranslations } from 'next-intl/server';
import { Box, Container, Link, Typography } from '@mui/material';

export default async function NotFoundPage() {
  const t = await getTranslations();
  return (
    <Container component='main' maxWidth='md'>
      <Box display='flex' paddingTop={16} gap={2} flexDirection='column'>
        <Typography variant='h2' color='error' textAlign='center'>
          {t('notfound.title')}
        </Typography>
        <Typography variant='h4' color='error' textAlign='center'>
          {t('notfound.description')}
        </Typography>
        <Link variant='h4' href='/' textAlign='center' marginTop={8}>
          {t('notfound.link')}
        </Link>
      </Box>
    </Container>
  );
}
