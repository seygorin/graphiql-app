'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import withAuth from 'utils/withAuth';
import { useResizablePanes } from '../../hooks/useResizablePanes';
import { decodeBase64Url, encodeRequestParams } from '../../utils/encodeBase64Url';
import { fetchQuery } from '../../utils/fetchQuery';
import { errorNotifyMessage, successNotifyMessage } from '../../utils/notifyMessage';
import HeadersEditor from './HeadersEditor';
import RequestBodyEditor from './RequestBodyEditor';
import RequestForm from './RequestForm';
import { Resizer } from './Resizer';
import ResponseViewer from './ResponseViewer';
import VariablesEditor from './VariablesEditor';

type ResponseType = Record<string, unknown> | { error: string } | null;

const RESTfulClient: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [requestBody, setRequestBody] = useState('');
  const [headers, setHeaders] = useState('Content-Type: application/json');
  const [variables, setVariables] = useState('');
  const [response, setResponse] = useState<ResponseType>(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { leftPaneWidth, handleMouseDown } = useResizablePanes();

  const updateURLWithoutNavigation = useCallback((newPath: string) => {
    window.history.pushState(null, '', newPath);
  }, []);

  useEffect(() => {
    const parts = pathname.split('/');
    if (parts.length >= 4 && parts[2] === 'restful') {
      const decodedMethod = parts[3];
      setMethod(decodedMethod);
      if (parts.length >= 5) {
        const decodedUrl = decodeBase64Url(parts[4]);
        setUrl(decodedUrl);
      }
      if (parts.length >= 6) {
        const decodedBody = decodeBase64Url(parts[5]);
        setRequestBody(decodedBody);
      }
    }
    const headerObj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      headerObj[key] = decodeURIComponent(value);
    });
    setHeaders(
      Object.entries(headerObj)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n'),
    );
  }, [pathname, searchParams]);

  const handleMethodChange = (event: SelectChangeEvent<string>) => {
    setMethod(event.target.value);
  };

  const handleSendRequest = async () => {
    setIsLoading(true);
    try {
      const headerObj = headers.split('\n').reduce(
        (acc, line) => {
          const [key, value] = line.split(':');
          if (key && value) {
            acc[key.trim()] = value.trim();
          }
          return acc;
        },
        {} as Record<string, string>,
      );

      const responseData = await fetchQuery({
        url,
        method: method as 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
        headers: headerObj,
        body: method !== 'GET' ? requestBody : undefined,
      });

      setResponse(responseData);
      setStatus('Success');
      successNotifyMessage(t('restful.requestSuccess'));

      const newPath = encodeRequestParams(
        method,
        url,
        requestBody,
        headers.split('\n').reduce(
          (acc, line) => {
            const [key, value] = line.split(':');
            if (key && value) {
              acc[key.trim()] = value.trim();
            }
            return acc;
          },
          {} as Record<string, string>,
        ),
      );
      updateURLWithoutNavigation(`/${locale}/restful${newPath}`);
    } catch (error) {
      setStatus('Error');
      setResponse(
        error instanceof Error ? { error: error.message } : { error: 'An unknown error occurred' },
      );
      errorNotifyMessage(t('restful.requestError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)', padding: 2 }}
    >
      <Paper elevation={3} sx={{ mb: 2, p: 2 }}>
        <RequestForm
          method={method}
          url={url}
          onMethodChange={handleMethodChange}
          onUrlChange={(e) => setUrl(e.target.value)}
          onSendRequest={handleSendRequest}
          t={t}
        />
      </Paper>

      <Box sx={{ display: 'flex', flex: 1, gap: 2 }}>
        <Paper
          elevation={3}
          sx={{
            width: `${leftPaneWidth}%`,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <HeadersEditor
            headers={headers}
            onHeadersChange={(e) => setHeaders(e.target.value)}
            t={t}
          />
          <VariablesEditor
            variables={variables}
            onVariablesChange={(e) => setVariables(e.target.value)}
            t={t}
          />
          {method !== 'GET' && (
            <RequestBodyEditor
              requestBody={requestBody}
              onRequestBodyChange={(e) => setRequestBody(e.target.value)}
              t={t}
            />
          )}
        </Paper>

        <Resizer onMouseDown={handleMouseDown} />

        <Paper
          elevation={3}
          sx={{
            width: `calc(${100 - leftPaneWidth}% - 8px)`,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <ResponseViewer isLoading={isLoading} status={status} response={response} t={t} />
        </Paper>
      </Box>
    </Box>
  );
};

export default withAuth(RESTfulClient);
