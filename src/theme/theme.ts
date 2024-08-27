'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {},
  palette: {
    primary: {
      main: 'rgba(41,108,235,0.9)',
    },
    secondary: {
      main: '#6c717d',
    },
  },
});

export default theme;

// const theme = createTheme({
//   palette: {
//     background: {
//       paper: '#fff',
//     },
//     text: {
//       primary: '#173A5E',
//       secondary: '#46505A',
//     },
//     action: {
//       active: '#001E3C',
//     },
//     success: {
//       dark: '#009688',
//     },
//   },
// });
