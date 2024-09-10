import { genStyles } from '../../styles/genStyles';
import theme, { ADDITION_COLOR } from '../../theme/theme';

export const STYLES = genStyles({
  background: {
    backgroundColor: ADDITION_COLOR.backgroundMain,
    minHeight: `calc(100vh - ${ADDITION_COLOR.headerHeight})`,
    display: 'flex',
  },
  info: {
    maxWidth: 'lg',
    margin: '0 auto',
    display: 'flex',
    gap: 5,
    flexGrow: 1,
    padding: { xl: 10, md: 8, sm: 6, xs: 1 },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  infoContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    gap: { md: 8, sm: 6, xs: 4 },
    width: '50%',
    [theme.breakpoints.down(1020)]: { width: '100%', textAlign: 'center' },
  },
  infoTitle: {
    px: { xl: 3, lg: 3, md: 3, sm: 1, xs: 1 },
    pb: { xl: 8, lg: 8, md: 6, sm: 6, xs: 0 },
    textTransform: 'uppercase',
    fontSize: { md: '3.7rem', sm: '3.1rem', xs: '2.2rem' },
  },
  infoTitleName: {
    fontStyle: 'italic',
    textTransform: 'none',
  },
  infoText: {
    px: 3,
  },
  infoImgWrapper: {
    width: '50%',
    flexGrow: '1',
    flexShrink: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: { flexGrow: '0' },
  },
  infoImg: {
    position: 'relative',
    [theme.breakpoints.down('md')]: { display: 'none', position: 'absolute' },
  },
  img: {
    position: 'absolute',
    display: 'flex',
    boxShadow: '7px 7px 16px 8px rgba(50, 50, 50, 0.5)',
    img: {
      [theme.breakpoints.down(1020)]: {
        width: 300,
        objectFit: 'contain',
        height: '100%',
      },
    },
  },
  imgScreenshot1: {
    bottom: 0,
    left: 0,
    [theme.breakpoints.down(1020)]: { left: '50%', transform: 'translate(-50%)' },
  },
  imgScreenshot2: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  imgScreenshot3: {
    right: 0,
    top: 0,
    [theme.breakpoints.down(1020)]: { right: '50%', transform: 'translate(50%)' },
  },
  notAuth: {
    backgroundColor: ADDITION_COLOR.backgroundMain,
    minHeight: `calc(100vh - ${ADDITION_COLOR.headerHeight} - ${ADDITION_COLOR.footerHeight})`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '30px',
  },
  notAuthTitle: {
    textAlign: 'center',
    fontSize: { md: '5.5rem', sm: '4.1rem', xs: '2.3rem' },
    textTransform: 'uppercase',
  },
});
