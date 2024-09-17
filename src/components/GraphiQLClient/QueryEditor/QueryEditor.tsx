import React from 'react';
import { Box } from '@mui/material';
import CodeEditor from '../../CodeEditor';

interface QueryEditorProps {
  query: string;
  onQueryChange: (value: string) => void;
  t: (key: string) => string;
  isGraphQL?: boolean;
}

const QueryEditor: React.FC<QueryEditorProps> = ({ query, onQueryChange, t, isGraphQL = true }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <CodeEditor
        value={query}
        onChange={onQueryChange}
        isGraphQL={isGraphQL}
        placeholder={t(isGraphQL ? 'graphiql.queryPlaceholder' : 'restful.bodyPlaceholder')}
      />
    </Box>
  );
};

export default QueryEditor;
