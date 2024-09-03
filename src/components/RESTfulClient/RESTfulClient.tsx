'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import withAuth from 'utils/withAuth';
import { useResizablePanes } from '../../hooks/useResizablePanes';
import { decodeBase64Url, encodeRequestParams } from '../../utils/encodeBase64Url';
import { fetchQuery } from '../../utils/fetchQuery';
import { errorNotifyMessage, successNotifyMessage } from '../../utils/notifyMessage';
import HeadersEditor from './HeadersEditor';
import RequestBodyEditor from './RequestBodyEditor';
import RequestForm from './RequestForm/RequestForm';
import Resizer from './Resizer';
import ResponseViewer from './ResponseViewer/ResponseViewer';
import VariablesEditor from './VariablesEditor/VariablesEditor';

type ResponseType = Record<string, unknown> | { error: string } | null;
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const RESTfulClient: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const effectRan = useRef(false);

  const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [requestBody, setRequestBody] = useState('');
  const [headers, setHeaders] = useState('Content-Type: application/json');
  const [variables, setVariables] = useState('');
  const [response, setResponse] = useState<ResponseType>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { leftPaneWidth, handleMouseDown } = useResizablePanes();

  const updateURLWithoutNavigation = useCallback((newPath: string) => {
    window.history.pushState(null, '', newPath);
  }, []);

  const sendRequest = useCallback(async () => {
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
        method,
        headers: headerObj,
        body: method !== 'GET' && method !== 'DELETE' ? requestBody : undefined,
      });

      setResponse(responseData);
      setStatus('200');
      successNotifyMessage(t('restful.requestSuccess'));
    } catch (error) {
      if (error instanceof Error) {
        const statusMatch = error.message.match(/status: (\d+)/);
        if (statusMatch) {
          setStatus(statusMatch[1]);
        } else {
          setStatus('Error');
        }
        setResponse({ error: error.message });
      } else {
        setStatus('Unknown Error');
        setResponse({ error: 'An unknown error occurred' });
      }
      errorNotifyMessage(t('restful.requestError'));
    } finally {
      setIsLoading(false);
    }
  }, [method, url, headers, requestBody, t]);

  const initializeFromUrl = useCallback(() => {
    const parts = pathname.split('/');
    if (parts.length >= 4 && parts[2] === 'restful') {
      const decodedMethod = parts[3] as HttpMethod;
      setMethod(decodedMethod);
      if (parts.length >= 5) {
        const decodedUrl = decodeBase64Url(parts[4]);
        setUrl(decodedUrl);
      }
      if (parts.length >= 6) {
        const decodedBody = decodeBase64Url(parts[5]);
        setRequestBody(decodedBody);
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

      sendRequest();
    }
  }, [pathname, searchParams, sendRequest, setMethod, setUrl, setRequestBody, setHeaders]);

  useEffect(() => {
    if (effectRan.current === false) {
      initializeFromUrl();
      effectRan.current = true;
    }
  }, [initializeFromUrl]);

  const handleMethodChange = (event: SelectChangeEvent<HttpMethod>) => {
    setMethod(event.target.value as HttpMethod);
  };

  const handleSendRequest = () => {
    const newPath = encodeRequestParams(
      method,
      url,
      method !== 'GET' && method !== 'DELETE' ? requestBody : '',
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
    sendRequest();
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)', padding: 2 }}
    >
      <Paper elevation={3} sx={{ mb: 2, p: 2 }}>
        <RequestForm
          method={method}
          url={url}
          status={status || ''}
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
            overflow: 'auto',
          }}
        >
          <HeadersEditor headers={headers} onHeadersChange={setHeaders} t={t} />
          <VariablesEditor variables={variables} onVariablesChange={setVariables} t={t} />
          {method !== 'GET' && method !== 'DELETE' && (
            <RequestBodyEditor
              requestBody={requestBody}
              onRequestBodyChange={setRequestBody}
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
          <ResponseViewer isLoading={isLoading} response={response} />
        </Paper>
      </Box>
    </Box>
  );
};

export default withAuth(RESTfulClient);
