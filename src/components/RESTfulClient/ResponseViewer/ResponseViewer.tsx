import React from 'react';
import { EditorView } from '@codemirror/view';
import { Box } from '@mui/material';
import { langs } from '@uiw/codemirror-extensions-langs';
import CodeMirror from '@uiw/react-codemirror';
import Loader from 'components/Loader';

interface ResponseViewerProps {
  isLoading: boolean;
  response: Record<string, unknown> | { error: string } | null;
}

const ResponseViewer: React.FC<ResponseViewerProps> = ({ isLoading, response }) => {
  const formatJson = (data: Record<string, unknown> | { error: string } | null) => {
    if (data === null) return '';
    return JSON.stringify(data, null, 2);
  };

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
        {/* <CircularProgress /> */}
        <Loader />
      </Box>
    );
  }

  if (response) {
    return (
      <Box sx={{ height: '100%', overflow: 'hidden' }}>
        <CodeMirror
          value={formatJson(response)}
          theme={EditorView.theme({
            '&': {
              height: '100%',
            },
          })}
          extensions={[langs.json(), EditorView.lineWrapping]}
          editable={false}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            highlightActiveLine: false,
          }}
          style={{ height: '100%' }}
        />
      </Box>
    );
  }

  return null;
};

export default ResponseViewer;
