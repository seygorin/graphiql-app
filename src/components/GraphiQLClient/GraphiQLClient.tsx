'use client';

import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchemaIcon from '@mui/icons-material/Schema';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Collapse,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import StatusChip from 'components/StatusChip';
import { useResizablePanes } from 'hooks/useResizablePanes';
import { encodeGraphQLRequestParams } from 'utils/encodeBase64Url';
import { fetchGraphQLQuery } from 'utils/fetchGraphQLQuery';
import { initializeFromUrl } from 'utils/initializeFromUrl';
import { errorNotifyMessage } from 'utils/notifyMessage';
import { saveToHistoryFirestore } from 'utils/saveToHistory';
import { auth } from '../../lib/firebase';
import {
  DEFAULT_ENDPOINT,
  DEFAULT_HEADERS,
  DEFAULT_QUERY,
  DEFAULT_VARIABLES,
  SCHEMA_QUERY,
} from '../../shared/consts/defaultsGrahpiQL';

const Resizer = dynamic(() => import('../RESTfulClient/Resizer'), { ssr: false });
const QueryEditor = dynamic(() => import('./QueryEditor'), { ssr: false });
const VariablesEditor = dynamic(() => import('components/RESTfulClient/VariablesEditor'), {
  ssr: false,
});
const HeadersEditor = dynamic(() => import('components/RESTfulClient/HeadersEditor'), {
  ssr: false,
});
const ResponseViewer = dynamic(() => import('components/RESTfulClient/ResponseViewer'), {
  ssr: false,
});
const DocumentationViewer = dynamic(() => import('./DocumentationViewer'), { ssr: false });

type ResponseType = Record<string, unknown> | { error: string } | null;

interface SchemaResult {
  data: {
    __schema: {
      types: Array<{
        name: string;
        description?: string;
        fields?: Array<{
          name: string;
          description?: string;
          type: {
            name?: string;
            kind: string;
          };
          args?: Array<{
            name: string;
            description?: string;
            type: {
              name?: string;
              kind: string;
            };
          }>;
        }>;
      }>;
      queryType?: { name: string };
      mutationType?: { name: string };
      subscriptionType?: { name: string };
    };
  };
}

const GraphiQLClient: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { leftPaneWidth, handleMouseDown } = useResizablePanes();

  const [user] = useAuthState(auth);
  const [endpoint, setEndpoint] = useState(DEFAULT_ENDPOINT);
  const [sdlEndpoint, setSdlEndpoint] = useState(`${DEFAULT_ENDPOINT}?sdl`);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [headers, setHeaders] = useState(DEFAULT_HEADERS);
  const [variables, setVariables] = useState(DEFAULT_VARIABLES);
  const [response, setResponse] = useState<ResponseType>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [documentation, setDocumentation] = useState<SchemaResult['data']['__schema'] | null>(null);
  const [showDocumentation, setShowDocumentation] = useState(false);
  const [isDocumentationExpanded, setIsDocumentationExpanded] = useState(true);

  useEffect(() => {
    const {
      url: initialEndpoint,
      query: initialQuery,
      headers: initialHeaders,
      variables: initialVariables,
      sdlUrl: initialSdlEndpoint,
    } = initializeFromUrl(pathname, searchParams);

    setEndpoint(initialEndpoint || DEFAULT_ENDPOINT);
    setSdlEndpoint(initialSdlEndpoint || `${initialEndpoint || DEFAULT_ENDPOINT}?sdl`);
    setQuery(initialQuery || DEFAULT_QUERY);
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

      try {
        headerObj = JSON.parse(headers);
      } catch (error) {
        errorNotifyMessage(t('graphiql.invalidHeadersJson'));
        setIsLoading(false);
        return;
      }

      try {
        variablesObj = JSON.parse(variables);
      } catch (error) {
        errorNotifyMessage(t('graphiql.invalidVariablesJson'));
        setIsLoading(false);
        return;
      }

      const responseData = await fetchGraphQLQuery({
        url: endpoint,
        query,
        variables: variablesObj,
        headers: headerObj,
      });

      setResponse(responseData);
      setStatus('200');

      await saveToHistoryFirestore(
        {
          method: 'GRAPHQL',
          url: endpoint,
          requestBody: query,
          headers,
          variables,
        },
        user.uid,
        t,
      );
    } catch (error) {
      if (error instanceof Error) {
        setStatus('Error');
        setResponse({ error: error.message });
        errorNotifyMessage(error.message);
      } else {
        setStatus('Unknown Error');
        setResponse({ error: 'An unknown error occurred' });
        errorNotifyMessage(t('graphiql.unknownError'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, query, headers, variables, t, user]);

  const fetchSchema = useCallback(async () => {
    setIsLoading(true);
    try {
      let parsedHeaders;
      try {
        parsedHeaders = JSON.parse(headers);
      } catch (error) {
        errorNotifyMessage(t('graphiql.invalidHeadersJson'));
        setIsLoading(false);
        return;
      }

      const responseData = await fetchGraphQLQuery({
        url: sdlEndpoint,
        query: SCHEMA_QUERY,
        headers: parsedHeaders,
      });

      /* eslint-disable no-underscore-dangle */
      const schemaResult = responseData as unknown as SchemaResult;
      if (schemaResult && schemaResult.data && schemaResult.data.__schema) {
        setDocumentation(schemaResult.data.__schema);
        setStatus('200');
      } else {
        throw new Error('Invalid schema data');
      }
    } catch (error) {
      errorNotifyMessage(t('graphiql.schemaFetchError'));
      setDocumentation(null);
      setStatus('Error');
    } finally {
      setIsLoading(false);
    }
  }, [sdlEndpoint, headers, t]);

  const handleSendRequest = () => {
    let parsedHeaders;
    try {
      parsedHeaders = JSON.parse(headers);
    } catch (error) {
      errorNotifyMessage(t('graphiql.invalidHeadersJson'));
      return;
    }

    const newPath = encodeGraphQLRequestParams(endpoint, query, parsedHeaders, variables);
    window.history.pushState(null, '', `/${locale}${newPath}`);
    sendRequest();
  };

  const toggleDocumentationExpansion = () => {
    setIsDocumentationExpanded((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: { xs: 'auto', md: 'calc(100vh - 270px)' },
        padding: 2,
        overflow: 'hidden',
      }}
    >
      <Paper elevation={3} sx={{ mb: 2, p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            mb: 2,
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              width: '100%',
            }}
          >
            <TextField
              fullWidth
              label={t('graphiql.endpointLabel')}
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <StatusChip status={status} />
                  </InputAdornment>
                ),
              }}
            />
            <Tooltip title={t('graphiql.sendRequest')}>
              <IconButton
                onClick={handleSendRequest}
                disabled={isLoading}
                color='primary'
                data-testid='send-request-button'
                sx={{
                  width: 48,
                  height: 48,
                  flexShrink: 0,
                  '& .MuiSvgIcon-root': {
                    fontSize: 24,
                  },
                }}
              >
                <SendIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              width: '100%',
            }}
          >
            <TextField
              fullWidth
              label={t('graphiql.sdlEndpointLabel')}
              value={sdlEndpoint}
              onChange={(e) => setSdlEndpoint(e.target.value)}
            />
            <Tooltip title={t('graphiql.fetchSchema')}>
              <IconButton
                onClick={() => {
                  fetchSchema();
                  setShowDocumentation(true);
                }}
                disabled={isLoading}
                color='primary'
                data-testid='fetch-schema-button'
                sx={{
                  width: 48,
                  height: 48,
                  flexShrink: 0,
                  '& .MuiSvgIcon-root': {
                    fontSize: 24,
                  },
                }}
              >
                <SchemaIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          flex: 1,
          gap: 2,
          minHeight: '10vh',
          mb: 2,
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
            <QueryEditor query={query} onQueryChange={setQuery} t={t} />
            <VariablesEditor variables={variables} onVariablesChange={setVariables} t={t} />
            <HeadersEditor headers={headers} onHeadersChange={setHeaders} t={t} />
          </Box>
        </Paper>

        {!isMobile && <Resizer onMouseDown={handleMouseDown} />}

        <Paper
          elevation={3}
          sx={{
            width: { xs: '100%', md: `calc(${100 - leftPaneWidth}% - 8px)` },
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
          }}
        >
          <ResponseViewer isLoading={isLoading} response={response} />
        </Paper>
      </Box>

      {showDocumentation && (
        <Paper
          elevation={3}
          sx={{
            position: 'relative',
            mt: 2,
            transition: 'all 0.3s ease',
            height: isDocumentationExpanded ? { xs: 'auto', md: 'calc(60% - 16px)' } : '48px',
            overflow: 'auto',
          }}
        >
          <Box
            sx={{
              height: '32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1,
              borderBottom: isDocumentationExpanded ? '1px solid #e0e0e0' : 'none',
            }}
          >
            <IconButton
              onClick={toggleDocumentationExpansion}
              data-testid={
                isDocumentationExpanded
                  ? 'collapse-documentation-button'
                  : 'expand-documentation-button'
              }
            >
              {isDocumentationExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
            <Typography>{t('graphiql.documentation')}</Typography>
            <IconButton onClick={() => setShowDocumentation(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Collapse in={isDocumentationExpanded} timeout='auto'>
            <Box sx={{ p: 2, height: '100%', overflow: 'auto' }}>
              {documentation ? (
                <DocumentationViewer schema={documentation} />
              ) : (
                <Typography>{t('graphiql.loadingDocumentation')}</Typography>
              )}
            </Box>
          </Collapse>
        </Paper>
      )}
    </Box>
  );
};

export default GraphiQLClient;
