import React from 'react';
import { TextField, Typography } from '@mui/material';

interface RequestBodyEditorProps {
  requestBody: string;
  onRequestBodyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  t: (key: string) => string;
}

const RequestBodyEditor: React.FC<RequestBodyEditorProps> = ({
  requestBody,
  onRequestBodyChange,
  t,
}) => (
  <>
    <Typography variant="h6" sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
      {t('restful.requestBody')}
    </Typography>
    <TextField
      multiline
      rows={5}
      variant="outlined"
      value={requestBody}
      onChange={onRequestBodyChange}
      sx={{ m: 2 }}
    />
  </>
);

export default RequestBodyEditor;
