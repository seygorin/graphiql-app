'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import withAuth from 'utils/withAuth';

const HistoryComponent: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();

  // mock
  const historyItems = [
    { id: 1, method: 'GET', url: 'https://api.example.com/resource/1' },
    { id: 2, method: 'POST', url: 'https://api.example.com/resource' },
    { id: 3, method: 'GRAPHQL', url: 'https://graphql.example.com/query' },
  ];

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant='h4' gutterBottom>
        {t('history.title')}
      </Typography>
      {historyItems.length > 0 ? (
        <List>
          {historyItems.map((item) => (
            <ListItem
              key={item.id}
              button
              component={Link}
              href={`/${locale}/dashboard/${item.method === 'GRAPHQL' ? 'graphiql' : 'restful'}`}
            >
              <ListItemText primary={`${item.method} ${item.url}`} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Box>
          <Typography>{t('history.noRequests')}</Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              component={Link}
              href={`/${locale}/dashboard/restful`}
              variant='contained'
              sx={{ mr: 2 }}
            >
              {t('history.tryRESTful')}
            </Button>
            <Button component={Link} href={`/${locale}/dashboard/graphiql`} variant='contained'>
              {t('history.tryGraphiQL')}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default withAuth(HistoryComponent);
