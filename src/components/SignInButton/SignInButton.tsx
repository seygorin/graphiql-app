'use client';

import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { deepOrange } from '@mui/material/colors';
import ISelectLanguageProps from 'components/Header/SelectLanguage';
import { useAuth } from 'hooks/useAuth';
import useTranslation from 'i18n/client';
import stringAvatar from 'utils/getStringAvatar';
import { signOutUser } from '../../lib/auth';

const SignInButton: FC<ISelectLanguageProps> = ({ lng }) => {
  const { t } = useTranslation(lng);
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  let name: string;

  if (user) {
    name = user?.displayName ? user.displayName : user?.email;
  }

  const signOut = async () => {
    await signOutUser();
  };

  const handleSignIn = () => {
    router.push('/signin');
  };

  return isLoggedIn ? (
    <>
      <Avatar sx={{ bgcolor: deepOrange[500] }} {...stringAvatar(name)} />
      {/* <Typography sx={{color: '#325bb4'}}>{user?.displayName ? user.displayName : user?.email}</Typography> */}
      <Button
        size="medium"
        variant="contained"
        color="secondary"
        onClick={signOut}
        endIcon={<LogoutIcon />}
      >
        {t('header.logout')}
      </Button>
    </>
  ) : (
    <Button
      size="medium"
      variant="contained"
      color="info"
      onClick={handleSignIn}
      endIcon={<ExitToAppIcon />}
    >
      {t('header.login')}
    </Button>
  );
};

export default SignInButton;
