import React from 'react';
import { Box, useTheme } from '@mui/material';

interface ResizerProps {
  onMouseDown: () => void;
}

export const Resizer: React.FC<ResizerProps> = ({ onMouseDown }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '8px',
        backgroundColor: theme.palette.divider,
        cursor: 'col-resize',
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
        },
        transition: 'background-color 0.3s',
      }}
      onMouseDown={onMouseDown}
    />
  );
};
