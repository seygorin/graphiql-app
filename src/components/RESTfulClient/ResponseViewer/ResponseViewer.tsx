import React, { useState } from 'react';
import { EditorView } from '@codemirror/view';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Box, IconButton } from '@mui/material';
import { langs } from '@uiw/codemirror-extensions-langs';
import CodeMirror from '@uiw/react-codemirror';
import Loader from 'components/Loader';

interface ResponseViewerProps {
  isLoading: boolean;
  response: Record<string, unknown> | { error: string } | null;
}

const ResponseViewer: React.FC<ResponseViewerProps> = ({ isLoading, response }) => {
  const [isFormatted, setIsFormatted] = useState(true);

  const formatJson = (data: Record<string, unknown> | { error: string } | null) => {
    if (data === null) return '';
    return JSON.stringify(data, null, isFormatted ? 2 : 0);
  };

  const handleFormat = () => {
    setIsFormatted(!isFormatted);
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
        <Loader />
      </Box>
    );
  }

  if (response) {
    return (
      <Box sx={{ height: '100%', overflow: 'auto', position: 'relative' }}>
        <IconButton
          onClick={handleFormat}
          sx={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            zIndex: 1,
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <AutoFixHighIcon />
        </IconButton>
        <CodeMirror
          value={formatJson(response)}
          theme={EditorView.theme({
            '&': {
              height: 'calc(100% - 40px)',
            },
          })}
          extensions={[langs.json(), EditorView.lineWrapping]}
          editable={false}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            highlightActiveLine: false,
          }}
        />
      </Box>
    );
  }

  return null;
};

export default ResponseViewer;
