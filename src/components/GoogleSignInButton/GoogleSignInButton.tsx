import Image from 'next/image';
import React, { FC } from 'react';
import Button from '@mui/material/Button';
import { STYLES } from 'components/GoogleSignInButton/styles.googleSignInButton';
import googleLogo from '../../assets/google-color-icon.svg';

interface IGoogleSignInButtonProps {
  title: string;
}

const GoogleSignInButton: FC<IGoogleSignInButtonProps> = ({ title }) => {
  return (
    <Button sx={STYLES.googleButton}>
      <Image
        src={googleLogo}
        width={25}
        height={25}
        alt='Google sign in button'
        style={STYLES.googleIcon}
      />
      {title}
    </Button>
  );
};

export default GoogleSignInButton;
