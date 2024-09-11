'use client';

import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
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
} from '@mui/material';
import StatusChip from 'components/StatusChip';
import { encodeGraphQLRequestParams } from 'utils/encodeBase64Url';
import { fetchGraphQLQuery } from 'utils/fetchGraphQLQuery';
import { initializeFromUrl } from 'utils/initializeFromUrl';
import { errorNotifyMessage } from 'utils/notifyMessage';
import { saveToHistory } from 'utils/saveToHistory';

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

const DEFAULT_ENDPOINT = 'https://swapi-graphql.netlify.app/.netlify/functions/index';
const DEFAULT_QUERY = `query {
  allFilms {
    films {
      title
      director
      releaseDate
    }
  }
}`;
const DEFAULT_HEADERS = `{
  "Content-Type": "application/json",
  "Accept": "application/json"
}`;
const DEFAULT_VARIABLES = `{
  "filmId": "ZmlsbXM6MQ=="
}`;

const GraphiQLClient: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

      saveToHistory({
        method: 'GRAPHQL',
        url: endpoint,
        requestBody: query,
        headers,
        variables,
      });
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
  }, [endpoint, query, headers, variables, t]);

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
        query: `
          query IntrospectionQuery {
            __schema {
              types {
                name
                description
                fields {
                  name
                  description
                  type {
                    name
                    kind
                  }
                  args {
                    name
                    description
                    type {
                      name
                      kind
                    }
                  }
                }
              }
              queryType { name }
              mutationType { name }
              subscriptionType { name }
            }
          }
        `,
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
        height: 'calc(100vh - 270px)',
        padding: 2,
        overflow: 'hidden',
      }}
    >
      <Paper elevation={3} sx={{ mb: 2, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
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
              sx={{
                width: 48,
                height: 48,
                '& .MuiSvgIcon-root': {
                  fontSize: 24,
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Tooltip>

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
              sx={{
                width: 48,
                height: 48,
                '& .MuiSvgIcon-root': {
                  fontSize: 24,
                },
              }}
            >
              <SchemaIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>

      <Box
        sx={{
          display: 'flex',
          flex: 1,
          gap: 2,
          minHeight: '10vh',
          mb: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            <QueryEditor query={query} onQueryChange={setQuery} t={t} />
            <VariablesEditor variables={variables} onVariablesChange={setVariables} t={t} />
            <HeadersEditor headers={headers} onHeadersChange={setHeaders} t={t} />
          </Box>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            width: '50%',
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
            height: isDocumentationExpanded ? 'calc(60% - 16px)' : '48px',
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
            <IconButton onClick={toggleDocumentationExpansion}>
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
