'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  Collapse,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import HeadersEditor from 'components/RESTfulClient/HeadersEditor';
import Resizer from 'components/RESTfulClient/Resizer';
import ResponseViewer from 'components/RESTfulClient/ResponseViewer';
import VariablesEditor from 'components/RESTfulClient/VariablesEditor';
import StatusChip from 'components/StatusChip';
import { useResizablePanes } from 'hooks/useResizablePanes';
import { encodeGraphQLRequestParams } from 'utils/encodeBase64Url';
import { fetchGraphQLQuery } from 'utils/fetchGraphQLQuery';
import { initializeFromUrl } from 'utils/initializeFromUrl';
import { errorNotifyMessage } from 'utils/notifyMessage';
import { saveToHistory } from 'utils/saveToHistory';
import withAuth from 'utils/withAuth';
import DocumentationViewer from './DocumentationViewer';
import QueryEditor from './QueryEditor';

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
  const effectRan = useRef(false);

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

  const { leftPaneWidth, handleMouseDown } = useResizablePanes();

  const updateURLWithoutNavigation = useCallback((newPath: string) => {
    window.history.pushState(null, '', newPath);
  }, []);

  const fetchSchema = useCallback(async () => {
    setIsLoading(true);
    try {
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
        headers: JSON.parse(headers),
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
      console.error('Failed to fetch schema:', error);
      setDocumentation(null);
      setStatus('Error');
      errorNotifyMessage(t('graphiql.schemaFetchError'));
    } finally {
      setIsLoading(false);
    }
  }, [sdlEndpoint, headers, t]);

  useEffect(() => {
    if (effectRan.current === false) {
      const {
        url: initialEndpoint,
        query: initialQuery,
        headers: initialHeaders,
        variables: initialVariables,
      } = initializeFromUrl(pathname, searchParams);
      setEndpoint(initialEndpoint || DEFAULT_ENDPOINT);
      setQuery(initialQuery || DEFAULT_QUERY);
      setHeaders(initialHeaders || DEFAULT_HEADERS);
      setVariables(initialVariables || DEFAULT_VARIABLES);
      effectRan.current = true;
    }
  }, [pathname, searchParams]);

  const sendRequest = useCallback(async () => {
    setIsLoading(true);
    try {
      const headerObj = JSON.parse(headers);
      const variablesObj = JSON.parse(variables);

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

  useEffect(() => {
    setSdlEndpoint(`${endpoint}?sdl`);
  }, [endpoint]);

  const handleSendRequest = () => {
    const newPath = encodeGraphQLRequestParams(endpoint, query, JSON.parse(headers), variables);
    updateURLWithoutNavigation(`/${locale}${newPath}`);
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
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
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
          <Button variant='contained' onClick={handleSendRequest} disabled={isLoading}>
            {t('graphiql.sendRequest')}
          </Button>

          <TextField
            fullWidth
            label={t('graphiql.sdlEndpointLabel')}
            value={sdlEndpoint}
            onChange={(e) => setSdlEndpoint(e.target.value)}
          />

          <Button
            variant='outlined'
            onClick={() => {
              fetchSchema();
              setShowDocumentation(true);
            }}
            disabled={isLoading}
          >
            {t('graphiql.fetchSchema')}
          </Button>
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
            width: `${leftPaneWidth}%`,
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

        <Resizer onMouseDown={handleMouseDown} />

        <Paper
          elevation={3}
          sx={{
            width: `calc(${100 - leftPaneWidth}% - 8px)`,
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

export default withAuth(GraphiQLClient);
