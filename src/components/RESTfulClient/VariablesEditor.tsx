import React from 'react';
import { TextField, Typography } from '@mui/material';

interface VariablesEditorProps {
  variables: string;
  onVariablesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  t: (key: string) => string;
}

const VariablesEditor: React.FC<VariablesEditorProps> = ({ variables, onVariablesChange, t }) => (
  <>
    <Typography variant="h6" sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
      {t('restful.variables')}
    </Typography>
    <TextField
      multiline
      rows={3}
      variant="outlined"
      value={variables}
      onChange={onVariablesChange}
      sx={{ m: 2 }}
    />
  </>
);

export default VariablesEditor;
