import { genStyles } from '../../styles/genStyles';
import theme, { ADDITION_COLOR } from '../../theme/theme';

export const STYLES = genStyles({
  wrapper: {
    textAlign: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    pt: '110px',
    pb: '28px',
    fontSize: {
      md: '2.1rem',
      sm: '1.9rem',
      xs: '1.7rem',
    },
  },
  cards: {
    display: 'flex',
    justifyContent: 'center',
    px: {
      xl: 0,
      sm: 10,
      xs: 5,
    },
    gap: {
      xl: 12,
      sm: 7,
      xs: 4,
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      maxWidth: '650px',
      m: '0 auto',
    },
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 1 25%',
    borderRadius: 2,
    textAlign: 'left',
    backgroundColor: 'secondary.main',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.down(490)]: {
      flexDirection: 'column',
      pl: 3,
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
    },
  },
  img: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      flex: '0 0 200px',
    },
    [theme.breakpoints.down(490)]: {
      flex: '0 1 200px',
    },
    [theme.breakpoints.down('xs')]: {
      flex: '1 1 100px',
    },
    img: {
      objectFit: 'contain',
      width: '100%',
      height: '100%',
    },
  },
  cardsInfo: {
    padding: '18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    color: ADDITION_COLOR.textFoo,
  },
  devName: {
    fontSize: {
      md: '1.5rem',
      sm: '1.3rem',
      xs: '1.1rem',
    },
  },
  devText: {
    fontSize: {
      md: '1.1rem',
      sm: '1.05rem',
      xs: '1rem',
    },
  },
});
