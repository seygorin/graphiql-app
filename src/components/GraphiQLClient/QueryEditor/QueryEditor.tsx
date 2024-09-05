import React from 'react';
import { EditorView } from '@codemirror/view';
import { Box, Button } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';

interface QueryEditorProps {
  query: string;
  onQueryChange: (value: string) => void;
  t: (key: string) => string;
}

const QueryEditor: React.FC<QueryEditorProps> = ({ query, onQueryChange, t }) => {
  const handleFormat = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(query), null, 2);
      onQueryChange(formatted);
    } catch (error) {
      console.error('Failed to format query:', error);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <CodeMirror
        value={query}
        height='200px'
        theme={EditorView.theme({
          '&': {
            height: '100%',
          },
        })}
        extensions={[graphql(), EditorView.lineWrapping]}
        onChange={onQueryChange}
        placeholder={t('graphiql.queryPlaceholder')}
      />
      <Button onClick={handleFormat} sx={{ mt: 1 }}>
        {t('graphiql.formatQuery')}
      </Button>
    </Box>
  );
};

export default QueryEditor;
