import React from 'react';
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestFormProps {
  method: HttpMethod;
  url: string;
  status: string;
  onMethodChange: (event: SelectChangeEvent<HttpMethod>) => void;
  onUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSendRequest: () => void;
  t: (key: string) => string;
}

const RequestForm: React.FC<RequestFormProps> = ({
  method,
  url,
  status,
  onMethodChange,
  onUrlChange,
  onSendRequest,
  t,
}) => {
  const statusCode = parseInt(status, 10);
  const isSuccess = statusCode >= 200 && statusCode < 300;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id='method-select-label'>{t('restful.method')}</InputLabel>
        <Select<HttpMethod>
          labelId='method-select-label'
          id='method-select'
          value={method}
          label={t('restful.method')}
          onChange={onMethodChange}
        >
          <MenuItem value='GET'>GET</MenuItem>
          <MenuItem value='POST'>POST</MenuItem>
          <MenuItem value='PUT'>PUT</MenuItem>
          <MenuItem value='PATCH'>PATCH</MenuItem>
          <MenuItem value='DELETE'>DELETE</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        variant='outlined'
        value={url}
        onChange={onUrlChange}
        placeholder={t('restful.endpoint')}
        InputProps={{
          endAdornment: status && (
            <InputAdornment position='end'>
              <Chip label={status} color={isSuccess ? 'success' : 'error'} size='small' />
            </InputAdornment>
          ),
        }}
      />
      <Button variant='contained' color='primary' onClick={onSendRequest}>
        {t('restful.sendRequest')}
      </Button>
    </Box>
  );
};

export default RequestForm;
