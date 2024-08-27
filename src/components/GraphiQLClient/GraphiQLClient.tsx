'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import withAuth from 'utils/withAuth';

const GraphiQLClient: React.FC = () => {
  const t = useTranslations();

  useEffect(() => {
    throw new Error();
  }, []);

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {t('graphiql.title')}
      </Typography>
      <TextField fullWidth label={t('graphiql.endpoint')} variant="outlined" margin="normal" />
      <TextField fullWidth label={t('graphiql.sdlEndpoint')} variant="outlined" margin="normal" />
      <TextField
        fullWidth
        label={t('graphiql.query')}
        variant="outlined"
        margin="normal"
        multiline
        rows={6}
      />
      <TextField
        fullWidth
        label={t('graphiql.variables')}
        variant="outlined"
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        fullWidth
        label={t('graphiql.headers')}
        variant="outlined"
        margin="normal"
        multiline
        rows={2}
      />
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        {t('graphiql.executeQuery')}
      </Button>
      <Typography variant="h6" sx={{ mt: 4 }}>
        {t('graphiql.response')}
      </Typography>
      <TextField
        fullWidth
        label={t('graphiql.response')}
        variant="outlined"
        margin="normal"
        multiline
        rows={6}
        InputProps={{
          readOnly: true,
        }}
      />
      <Typography variant="h6" sx={{ mt: 4 }}>
        {t('graphiql.documentation')}
      </Typography>
      <Box sx={{ border: 1, borderColor: 'grey.300', p: 2, mt: 2 }}>
        <Typography>{t('graphiql.documentationPlaceholder')}</Typography>
      </Box>
    </Box>
  );
};

export default withAuth(GraphiQLClient);
