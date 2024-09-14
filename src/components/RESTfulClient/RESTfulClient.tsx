'use client';

import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Box, Paper, useMediaQuery, useTheme } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useResizablePanes } from 'hooks/useResizablePanes';
import { encodeRestRequestParams } from 'utils/encodeBase64Url';
import { fetchQuery } from 'utils/fetchQuery';
import { HttpMethod, initializeFromUrl } from 'utils/initializeFromUrl';
import { errorNotifyMessage } from 'utils/notifyMessage';
import { saveToHistoryFirestore } from 'utils/saveToHistory';
import { auth } from '../../lib/firebase';
import {
  DEFAULT_HEADERS,
  DEFAULT_METHOD,
  DEFAULT_REQUEST_BODY,
  DEFAULT_URL,
  DEFAULT_VARIABLES,
} from '../../shared/consts/defaultRestful';

const HeadersEditor = dynamic(() => import('./HeadersEditor'), { ssr: false });
const RequestBodyEditor = dynamic(() => import('./RequestBodyEditor'), { ssr: false });
const RequestForm = dynamic(() => import('./RequestForm/RequestForm'), { ssr: false });
const Resizer = dynamic(() => import('./Resizer'), { ssr: false });
const ResponseViewer = dynamic(() => import('./ResponseViewer/ResponseViewer'), { ssr: false });
const VariablesEditor = dynamic(() => import('./VariablesEditor/VariablesEditor'), { ssr: false });

type ResponseType = Record<string, unknown> | { error: string } | null;

const RESTfulClient: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [user] = useAuthState(auth);
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
    const {
      method: initialMethod,
      url: initialUrl,
      requestBody: initialBody,
      headers: initialHeaders,
      variables: initialVariables,
    } = initializeFromUrl(pathname, searchParams);

    const isValidHttpMethod = (methodToCheck: string | undefined): methodToCheck is HttpMethod =>
      methodToCheck !== undefined &&
      ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(methodToCheck);

    if (isValidHttpMethod(initialMethod)) {
      setMethod(initialMethod);
    }
    setUrl(initialUrl || DEFAULT_URL);
    setRequestBody(initialBody || DEFAULT_REQUEST_BODY);
    setHeaders(initialHeaders || DEFAULT_HEADERS);
    setVariables(initialVariables || DEFAULT_VARIABLES);
  }, [pathname, searchParams]);

  const sendRequest = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!user) {
        throw new Error('User is not authenticated');
      }
      let headerObj;
      let variablesObj;
      let bodyObj;

      try {
        headerObj = JSON.parse(headers);
      } catch (error) {
        errorNotifyMessage(t('restful.invalidHeadersJson'));
        return;
      }

      try {
        variablesObj = JSON.parse(variables);
      } catch (error) {
        errorNotifyMessage(t('restful.invalidVariablesJson'));
        return;
      }

      if (method !== 'GET' && method !== 'DELETE') {
        try {
          bodyObj = JSON.parse(requestBody);
        } catch (error) {
          errorNotifyMessage(t('restful.invalidRequestBodyJson'));
          return;
        }
      }

      const responseData = await fetchQuery({
        url,
        method,
        headers: headerObj,
        body: bodyObj,
        variables: variablesObj,
      });

      setResponse(responseData);
      setStatus('200');

      await saveToHistoryFirestore(
        {
          method,
          url,
          requestBody,
          headers: JSON.stringify(headerObj),
          variables,
        },
        user.uid,
        t,
      );
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
        errorNotifyMessage(t('restful.unknownError'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [method, url, headers, requestBody, variables, t, user]);

  const handleMethodChange = (event: SelectChangeEvent<HttpMethod>) => {
    setMethod(event.target.value as HttpMethod);
  };

  const handleSendRequest = () => {
    try {
      const parsedHeaders = JSON.parse(headers);
      const newPath = encodeRestRequestParams(
        method,
        url,
        method !== 'GET' && method !== 'DELETE' ? requestBody : '',
        parsedHeaders,
      );
      updateURLWithoutNavigation(`/${locale}${newPath}`);
      sendRequest();
    } catch (error) {
      errorNotifyMessage(t('restful.invalidHeadersJson'));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: { xs: 'auto', md: 'calc(100vh - 250px)' },
        padding: 2,
      }}
    >
      <Paper elevation={3} sx={{ mb: 2, p: 2 }}>
        <RequestForm
          method={method}
          isLoading={isLoading}
          url={url}
          status={status || ''}
          onMethodChange={handleMethodChange}
          onUrlChange={(e) => setUrl(e.target.value)}
          onSendRequest={handleSendRequest}
          t={t}
        />
      </Paper>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          flex: 1,
          gap: 2,
          minHeight: '10vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: { xs: '100%', md: `${leftPaneWidth}%` },
            display: 'flex',
            flexDirection: 'column',
            mb: { xs: 2, md: 0 },
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

        {!isMobile && <Resizer onMouseDown={handleMouseDown} />}

        <Paper
          elevation={3}
          sx={{
            width: { xs: '100%', md: `calc(${100 - leftPaneWidth}% - 8px)` },
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

export default RESTfulClient;
