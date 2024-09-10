import React from 'react';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 150px)'>
      <CircularProgress color='primary' />
    </Box>
  );
};

export default Loader;
