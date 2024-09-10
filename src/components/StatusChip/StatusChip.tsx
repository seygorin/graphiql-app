import React from 'react';
import { Chip } from '@mui/material';

interface StatusChipProps {
  status: string | null;
}

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  if (!status) return null;

  const statusCode = parseInt(status, 10);
  const isSuccess = statusCode >= 200 && statusCode < 300;

  return (
    <Chip label={status} color={isSuccess ? 'success' : 'error'} size='small' sx={{ ml: 1 }} />
  );
};

export default StatusChip;
