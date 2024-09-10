'use client';

import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import vars from '../styles/vars.module.scss';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const ADDITION_COLOR = {
  headerHeight: vars.headerHeight,
  footerHeight: vars.footerHeight,

  backgroundMain: vars.backgroundMain,
  backgroundFooter: vars.backgroundFooter,
  textGoogle: vars.textGoogle,
  backgroundGoogle: vars.backgroundGoogle,
  shadowMain: vars.shadowMain,
  borderFooter: vars.borderFooter,
  textFoo: vars.textFoo,
  info: vars.infoMain,
};

const theme = createTheme({
  palette: {
    primary: {
      main: vars.primaryMain,
      light: vars.primaryLight,
      dark: vars.primaryDark,
      contrastText: vars.primaryContrastText,
    },
    secondary: {
      main: vars.secondaryMain,
      light: vars.secondaryLight,
      dark: vars.secondaryDark,
      contrastText: vars.secondaryContrastText,
    },
    error: {
      main: vars.errorMain,
    },
    warning: {
      main: vars.warningMain,
    },
    info: {
      main: vars.infoMain,
    },
    success: {
      main: vars.successMain,
      light: vars.successLight,
    },
    background: {
      default: vars.backgroundDefault,
      paper: vars.backgroundPaper,
    },
    text: {
      primary: vars.textPrimary,
      secondary: vars.textSecondary,
      disabled: vars.textDisabled,
    },
  },

  breakpoints: {
    values: {
      xs: 300,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  spacing: 4,

  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontSize: '4.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '4rem',
      fontWeight: 400,
    },
    h3: {
      fontSize: '2.1rem',
      fontWeight: 400,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 400,
    },
    h5: {
      fontSize: '1.3rem',
      fontWeight: 400,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 300,
    },
    body1: {
      fontSize: '1.1rem',
      fontWeight: 300,
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
          fontWeight: 400,
        },
      },
    },
    MuiLink: {
      variants: [],
      styleOverrides: {
        root: {
          color: vars.primaryMain,
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
            color: vars.primaryLight,
          },
          '&.active': {
            color: vars.primaryLight,
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
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            color: vars.textSecondary,
            '&.Mui-error': {
              color: vars.primaryLight,
            },
          },
          '& .MuiInputLabel-root': {
            color: vars.secondaryDark,
            '&.Mui-error': {
              color: vars.primaryLight,
            },
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: vars.secondaryDark,
            },
            '&:hover fieldset': {
              borderColor: vars.textPrimary,
            },
            '&.Mui-focused fieldset': {
              borderColor: vars.infoMain,
            },
            '&.Mui-error fieldset': {
              borderColor: vars.primaryLight,
            },
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          position: 'relative',
          '& .MuiInputBase-root': {
            color: vars.textSecondary,
            '&.Mui-error': {
              color: vars.primaryLight,
            },
          },
          '& .MuiInputLabel-root': {
            color: vars.secondaryDark,
            '&.Mui-error': {
              color: vars.primaryLight,
            },
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: vars.secondaryDark,
            },
            '&:hover fieldset': {
              borderColor: vars.textPrimary,
            },
            '&.Mui-focused fieldset': {
              borderColor: vars.infoMain,
            },
            '&.Mui-error fieldset': {
              borderColor: vars.primaryLight,
            },
          },
        },
      },
    },
  },
});

export default theme;
