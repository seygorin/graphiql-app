'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useResizablePanes } from 'hooks/useResizablePanes';
import { encodeRequestParams } from 'utils/encodeBase64Url';
import { fetchQuery } from 'utils/fetchQuery';
import { HttpMethod, initializeFromUrl } from 'utils/initializeFromUrl';
import { errorNotifyMessage } from 'utils/notifyMessage';
import { saveToHistory } from 'utils/saveToHistory';
import withAuth from 'utils/withAuth';
import HeadersEditor from './HeadersEditor';
import RequestBodyEditor from './RequestBodyEditor';
import RequestForm from './RequestForm';
import Resizer from './Resizer';
import ResponseViewer from './ResponseViewer';
import VariablesEditor from './VariablesEditor';

type ResponseType = Record<string, unknown> | { error: string } | null;

const RESTfulClient: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const effectRan = useRef(false);

  const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts');
  const [requestBody, setRequestBody] = useState(
    '{\n  "title": "foo",\n  "body": "bar",\n  "userId": 1\n}',
  );
  const [headers, setHeaders] = useState('{\n  "Content-Type": "application/json"\n}');
  const [variables, setVariables] = useState('{\n  "id": 1\n}');
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
      const headerObj = JSON.parse(headers);
      const variablesObj = JSON.parse(variables);
      const bodyObj = method !== 'GET' && method !== 'DELETE' ? JSON.parse(requestBody) : undefined;

      const responseData = await fetchQuery({
        url,
        method,
        headers: headerObj,
        body: bodyObj,
        variables: variablesObj,
      });

      setResponse(responseData);
      setStatus('200');

      saveToHistory({
        method,
        url,
        requestBody,
        headers: JSON.stringify(headerObj),
        variables,
      });
    } catch (error) {
      if (error instanceof SyntaxError) {
        errorNotifyMessage(t('restful.invalidJson'));
      } else if (error instanceof Error) {
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
        errorNotifyMessage(t('restful.unknownError'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [method, url, headers, requestBody, variables, t]);

  useEffect(() => {
    if (effectRan.current === false) {
      const {
        method: initialMethod,
        url: initialUrl,
        requestBody: initialBody,
        headers: initialHeaders,
      } = initializeFromUrl(pathname, searchParams);
      setMethod(initialMethod);
      setUrl(initialUrl);
      setRequestBody(initialBody);
      setHeaders(initialHeaders);
      effectRan.current = true;
    }
  }, [pathname, searchParams]);

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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 270px)',
        padding: 2,
        overflow: 'hidden',
      }}
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

      <Box sx={{ display: 'flex', flex: 1, gap: 2, overflow: 'hidden' }}>
        <Paper
          elevation={3}
          sx={{
            width: `${leftPaneWidth}%`,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            <HeadersEditor headers={headers} onHeadersChange={setHeaders} t={t} />
            <VariablesEditor variables={variables} onVariablesChange={setVariables} t={t} />
            {method !== 'GET' && method !== 'DELETE' && (
              <RequestBodyEditor
                requestBody={requestBody}
                onRequestBodyChange={setRequestBody}
                t={t}
              />
            )}
          </Box>
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
