'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useResizablePanes } from 'hooks/useResizablePanes';
import { encodeRestRequestParams } from 'utils/encodeBase64Url';
import { fetchQuery } from 'utils/fetchQuery';
import { HttpMethod, initializeFromUrl } from 'utils/initializeFromUrl';
import { errorNotifyMessage } from 'utils/notifyMessage';
import { saveToHistory } from 'utils/saveToHistory';
import withAuth from 'utils/withAuth';
import HeadersEditor from './HeadersEditor';
import RequestBodyEditor from './RequestBodyEditor';
import RequestForm from './RequestForm/RequestForm';
import Resizer from './Resizer';
import ResponseViewer from './ResponseViewer/ResponseViewer';
import VariablesEditor from './VariablesEditor/VariablesEditor';

type ResponseType = Record<string, unknown> | { error: string } | null;

const DEFAULT_METHOD: HttpMethod = 'GET';
const DEFAULT_URL = 'https://jsonplaceholder.typicode.com/posts';
const DEFAULT_REQUEST_BODY = '{\n  "title": "foo",\n  "body": "bar",\n  "userId": 1\n}';
const DEFAULT_HEADERS = '{\n  "Content-Type": "application/json"\n}';
const DEFAULT_VARIABLES = '{\n  "id": 1\n}';

const RESTfulClient: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const effectRan = useRef(false);

  const [method, setMethod] = useState<HttpMethod>(DEFAULT_METHOD);
  const [url, setUrl] = useState(DEFAULT_URL);
  const [requestBody, setRequestBody] = useState(DEFAULT_REQUEST_BODY);
  const [headers, setHeaders] = useState(DEFAULT_HEADERS);
  const [variables, setVariables] = useState(DEFAULT_VARIABLES);
  const [response, setResponse] = useState<ResponseType>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { leftPaneWidth, handleMouseDown } = useResizablePanes();

  const updateURLWithoutNavigation = useCallback((newPath: string) => {
    window.history.pushState(null, '', newPath);
  }, []);

  useEffect(() => {
    if (effectRan.current === false) {
      const {
        method: initialMethod,
        url: initialUrl,
        requestBody: initialBody,
        headers: initialHeaders,
      } = initializeFromUrl(pathname, searchParams);

      const isValidHttpMethod = (methodToCheck: string | undefined): methodToCheck is HttpMethod =>
        methodToCheck !== undefined &&
        ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(methodToCheck);

      if (isValidHttpMethod(initialMethod)) {
        setMethod(initialMethod);
      } else {
        setMethod(DEFAULT_METHOD);
      }

      setUrl(initialUrl || DEFAULT_URL);
      setRequestBody(initialBody || DEFAULT_REQUEST_BODY);
      setHeaders(initialHeaders || DEFAULT_HEADERS);
      effectRan.current = true;
    }
  }, [pathname, searchParams]);

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

  const handleMethodChange = (event: SelectChangeEvent<HttpMethod>) => {
    setMethod(event.target.value as HttpMethod);
  };

  const handleSendRequest = () => {
    const newPath = encodeRestRequestParams(
      method,
      url,
      method !== 'GET' && method !== 'DELETE' ? requestBody : '',
      JSON.parse(headers),
    );
    updateURLWithoutNavigation(`/${locale}${newPath}`);
    sendRequest();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 250px)',
        padding: 2,
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

      <Box sx={{ display: 'flex', flex: 1, gap: 2, minHeight: '10vh' }}>
        <Paper
          elevation={3}
          sx={{
            width: `${leftPaneWidth}%`,
            display: 'flex',
            flexDirection: 'column',
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
