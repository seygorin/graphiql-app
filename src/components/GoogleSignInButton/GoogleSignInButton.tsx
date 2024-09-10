// import React, { FC } from 'react';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import googleLogo from '../../assets/google-color-icon.svg'
// import Image from 'next/image';
// import { ADDITION_COLOR } from '../../theme/theme';
// interface IGoogleSignInButtonProps {
//   title: string;
// }
//
// const GoogleButton = styled(Button)({
//   backgroundColor: ADDITION_COLOR.textFoo,
//   color: ADDITION_COLOR.textGoogle,
//   border: '1px solid #ddd',
//   borderRadius: '0.3rem',
//   textTransform: 'none',
//   fontSize: '0.8rem',
//   padding: '0.6rem 0.9rem',
//   marginTop: '0.7rem',
//   cursor: 'pointer',
//   width: '100%',
//   height: '100%',
//   '&:hover': {
//     backgroundColor: ADDITION_COLOR.backgroundGoogle,
//     border: `1px solid ${ADDITION_COLOR.info}`,
//   },
// });
//
// const GoogleSignInButton: FC<IGoogleSignInButtonProps> = ({title}) => {
//   return (
//       <GoogleButton variant="outlined" startIcon={<Image
//           src={googleLogo}
//           width={25}
//           height={25}
//           alt="Google sign in button"
//       />}>
//         {title}
//       </GoogleButton>
//   );
// };
//
// export default GoogleSignInButton;
import Image from 'next/image';
import React, { FC } from 'react';
import { Button } from '@mui/base';
import googleLogo from '../../assets/google-color-icon.svg';
import s from './GoogleSignInButton.module.scss';

interface IGoogleSignInButtonProps {
  title: string;
}

const GoogleSignInButton: FC<IGoogleSignInButtonProps> = ({ title }) => {
  return (
    <Button className={s.googleButton}>
      <Image
        src={googleLogo}
        width={25}
        height={25}
        alt='Google sign in button'
        className={s.googleIcon}
      />
      {title}
    </Button>
  );
};

export default GoogleSignInButton;
