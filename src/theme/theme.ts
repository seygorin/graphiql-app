'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#286af2',
      light: '#588cf7',
      dark: '#124fcb',
      contrastText: '#fff',
    },
    secondary: {
      main: '#1f43a0',
      light: '#355bbd',
      dark: '#193889',
      contrastText: '#fff',
    },
    error: {
      main: '#e23023',
    },
    warning: {
      main: '#f09713',
    },
    info: {
      main: '#286af2',
      light: '#588cf7',
      dark: '#124fcb',
      contrastText: '#fff',
    },
    success: {
      main: '#8f8b88',
      light: '#e5e3e1',
    },
    background: {
      default: '#fffefe',
      paper: '#efefef', //
    },
    text: {
      primary: '#333', // основной цвет текста
      secondary: '#6c6c6c', // цвет вторичного текста
      disabled: '#a5a4a4', // цвет текста при отключенном состоянии
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '5rem',
      fontWeight: 400,
    },
    h2: {
      fontSize: '3rem',
      fontWeight: 400,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 400,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 400,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 400,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'uppercase',
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // отмена преобразования текста в верхний регистр
        },
      },
    },
    MuiContainer: {},
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#286af2',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
            color: '#124fcb',
          },
          '&.active': {
            color: '#124fcb',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: '#fff',
          backgroundColor: '#FF9C00',
        },
      },
    },
  },
});

export default theme;
