import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import CodeEditor from 'components/CodeEditor/CodeEditor';

interface CollapsibleCodeEditorProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
}

const CollapsibleCodeEditor: React.FC<CollapsibleCodeEditorProps> = ({
  title,
  value,
  onChange,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CodeEditor value={value} onChange={onChange} />
      </AccordionDetails>
    </Accordion>
  );
};

export default CollapsibleCodeEditor;
