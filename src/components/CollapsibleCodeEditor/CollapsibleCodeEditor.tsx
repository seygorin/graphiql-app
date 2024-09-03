import React, { useState } from 'react';
import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, IconButton, Typography } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';

interface CollapsibleCodeEditorProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  language?: 'json' | 'plaintext';
}

const CollapsibleCodeEditor: React.FC<CollapsibleCodeEditorProps> = ({
  title,
  value,
  onChange,
  language = 'plaintext',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleExpand}>
        <IconButton size="small">{isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
        <Typography variant="h6">{title}</Typography>
      </Box>
      {isExpanded && (
        <CodeMirror
          theme={EditorView.theme({})}
          value={value}
          height="100px"
          extensions={language === 'json' ? [json()] : []}
          onChange={onChange}
          editable
        />
      )}
    </Box>
  );
};

export default CollapsibleCodeEditor;
