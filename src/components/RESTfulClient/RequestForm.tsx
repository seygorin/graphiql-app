import React from 'react';
import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface RequestFormProps {
  method: string;
  url: string;
  onMethodChange: (event: SelectChangeEvent<string>) => void;
  onUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSendRequest: () => void;
  t: (key: string) => string;
}

const RequestForm: React.FC<RequestFormProps> = ({
  method,
  url,
  onMethodChange,
  onUrlChange,
  onSendRequest,
  t,
}) => (
  <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
    <Select
      value={method}
      label={t('restful.method')}
      onChange={onMethodChange}
      sx={{ width: 120 }}
    >
      <MenuItem value="GET">GET</MenuItem>
      <MenuItem value="POST">POST</MenuItem>
    </Select>
    <TextField
      fullWidth
      variant="outlined"
      value={url}
      onChange={onUrlChange}
      placeholder={t('restful.endpoint')}
    />
    <Button variant="contained" color="primary" onClick={onSendRequest}>
      {t('restful.sendRequest')}
    </Button>
  </FormControl>
);

export default RequestForm;
