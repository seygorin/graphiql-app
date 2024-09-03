'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { Base64 } from 'js-base64';
import { errorNotifyMessage, warningNotifyMessage } from 'utils/notifyMessage';
import withAuth from 'utils/withAuth';

interface HistoryItem {
  id: string;
  method: string;
  url: string;
  timestamp: number;
  requestBody?: string;
  headers?: string;
  variables?: string;
  sdlUrl?: string;
}

const HistoryComponent: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  const loadHistory = useCallback(() => {
    const storedHistory = localStorage.getItem('requestHistory');
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory) as HistoryItem[];
        setHistoryItems(parsedHistory.sort((a, b) => b.timestamp - a.timestamp));
      } catch (error) {
        errorNotifyMessage(t('history.errorParsingHistory'));
        setHistoryItems([]);
      }
    }
  }, [t]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const clearHistory = useCallback(() => {
    localStorage.removeItem('requestHistory');
    setHistoryItems([]);
    warningNotifyMessage(t('history.historyCleared'));
  }, [t]);

  const generateLink = (item: HistoryItem) => {
    const isGraphQL = item.method === 'GRAPHQL';
    const basePath = `/${locale}/${isGraphQL ? 'graphiql' : 'restful'}`;

    if (isGraphQL) {
      const params = new URLSearchParams({
        url: item.url,
        sdlUrl: item.sdlUrl || '',
        query: item.requestBody || '',
        variables: item.variables || '',
        headers: item.headers || '',
      });
      return `${basePath}?${params.toString()}`;
    }

    const encodedUrl = Base64.encodeURI(item.url);
    const encodedBody = item.requestBody ? `/${Base64.encodeURI(item.requestBody)}` : '';
    const headerParams = new URLSearchParams();

    if (item.headers) {
      try {
        const parsedHeaders = JSON.parse(item.headers);
        if (typeof parsedHeaders === 'object' && parsedHeaders !== null) {
          Object.entries(parsedHeaders).forEach(([key, value]) => {
            headerParams.append(key, encodeURIComponent(String(value)));
          });
        }
      } catch (error) {
        errorNotifyMessage(t('history.errorParsingHeaders'));
      }
    }

    return `${basePath}/${item.method}/${encodedUrl}${encodedBody}?${headerParams.toString()}`;
  };

  const getChipColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'success';
      case 'POST':
        return 'primary';
      case 'PUT':
        return 'warning';
      case 'DELETE':
        return 'error';
      case 'PATCH':
        return 'info';
      case 'GRAPHQL':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Box display='flex' justifyContent='flex-end' alignItems='center' mb={2}>
        {historyItems.length > 0 && (
          <Button variant='outlined' color='secondary' onClick={clearHistory}>
            {t('history.clearHistory')}
          </Button>
        )}
      </Box>
      {historyItems.length > 0 ? (
        <List>
          {historyItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton component={Link} href={generateLink(item)}>
                <Chip
                  label={item.method}
                  color={
                    getChipColor(item.method) as
                      | 'success'
                      | 'primary'
                      | 'warning'
                      | 'error'
                      | 'info'
                      | 'secondary'
                      | 'default'
                  }
                  size='small'
                  sx={{ mr: 2 }}
                />
                <ListItemText
                  primary={item.url}
                  secondary={new Date(item.timestamp).toLocaleString()}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Box textAlign='center'>
          <Typography variant='h6' gutterBottom>
            {t('history.noRequests')}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default withAuth(HistoryComponent);
