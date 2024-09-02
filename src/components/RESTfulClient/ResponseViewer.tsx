import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import { Box, CircularProgress, Typography } from '@mui/material';
import { basicLight } from '@uiw/codemirror-theme-basic';
// import { basicDark } from '@uiw/codemirror-theme-basic';
import CodeMirror from '@uiw/react-codemirror';

interface ResponseViewerProps {
  isLoading: boolean;
  status: string;
  response: Record<string, unknown> | { error: string } | null;
  t: (key: string) => string;
}

const ResponseViewer: React.FC<ResponseViewerProps> = ({ isLoading, status, response, t }) => {
  const formatJson = (data: Record<string, unknown> | { error: string } | null) => {
    if (data === null) return '';
    return JSON.stringify(data, null, 2);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

    if (response) {
      return (
        <CodeMirror
          value={formatJson(response)}
          height="100%"
          theme={basicLight}
          extensions={[json(), EditorView.lineWrapping]}
          editable={false}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            highlightActiveLine: false,
          }}
        />
      );
    }

    return null;
  };

  return (
    <>
      <Typography variant="h6" sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        {t('restful.response')}
      </Typography>
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
        <Typography variant="body1" gutterBottom>
          {t('restful.status')}: {status}
        </Typography>
        <Box sx={{ flex: 1, overflow: 'hidden' }}>{renderContent()}</Box>
      </Box>
    </>
  );
};

export default ResponseViewer;
