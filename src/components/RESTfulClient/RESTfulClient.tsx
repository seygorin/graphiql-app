'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const RESTfulClient: React.FC = () => {
  const t = useTranslations();

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {t('restful.title')}
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="method-select-label">{t('restful.method')}</InputLabel>
        <Select
          labelId="method-select-label"
          id="method-select"
          label={t('restful.method')}
          defaultValue="GET"
        >
          <MenuItem value="GET">GET</MenuItem>
          <MenuItem value="POST">POST</MenuItem>
        </Select>
      </FormControl>
      <TextField fullWidth label={t('restful.endpoint')} variant="outlined" margin="normal" />
      <TextField
        fullWidth
        label={t('restful.requestBody')}
        variant="outlined"
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        fullWidth
        label={t('restful.headers')}
        variant="outlined"
        margin="normal"
        multiline
        rows={2}
      />
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        {t('restful.sendRequest')}
      </Button>
      <Typography variant="h6" sx={{ mt: 4 }}>
        {t('restful.response')}
      </Typography>
      <Typography variant="body1">{t('restful.status')}: 200 OK</Typography>
      <TextField
        fullWidth
        label={t('restful.responseBody')}
        variant="outlined"
        margin="normal"
        multiline
        rows={6}
        InputProps={{
          readOnly: true,
        }}
      />
    </Box>
  );
};

export default RESTfulClient;
