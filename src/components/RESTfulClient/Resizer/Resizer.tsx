import React, { useCallback, useMemo } from 'react';
import { Box, useTheme } from '@mui/material';

interface ResizerProps {
  onMouseDown: () => void;
}

const Resizer: React.FC<ResizerProps> = React.memo(({ onMouseDown }) => {
  const theme = useTheme();

  const handleMouseDown = useCallback(() => {
    onMouseDown();
  }, [onMouseDown]);

  const resizerStyle = useMemo(
    () => ({
      width: '8px',
      backgroundColor: theme.palette.divider,
      cursor: 'col-resize',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
      transition: 'background-color 0.3s',
    }),
    [theme.palette.divider, theme.palette.primary.main],
  );

  return <Box data-testid='resizer' sx={resizerStyle} onMouseDown={handleMouseDown} />;
});

Resizer.displayName = 'Resizer';

export default Resizer;
