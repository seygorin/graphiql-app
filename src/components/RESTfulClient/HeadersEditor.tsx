import React from 'react';
import { TextField, Typography } from '@mui/material';

interface HeadersEditorProps {
  headers: string;
  onHeadersChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  t: (key: string) => string;
}

const HeadersEditor: React.FC<HeadersEditorProps> = ({ headers, onHeadersChange, t }) => (
  <>
    <Typography variant="h6" sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
      {t('restful.headers')}
    </Typography>
    <TextField
      multiline
      rows={3}
      variant="outlined"
      value={headers}
      onChange={onHeadersChange}
      sx={{ m: 2 }}
    />
  </>
);

export default HeadersEditor;
