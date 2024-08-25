'use client';

import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LogoutIcon from '@mui/icons-material/Logout';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { deepOrange } from '@mui/material/colors';
import { ISelectLanguageProps } from 'components/Header/SelectLanguage';
import { useAuth } from 'hooks/useAuth';
import useTranslation from 'i18n/client';
import stringAvatar from 'utils/getStringAvatar';
import { signOutUser } from '../../lib/auth';

const SignInButton: FC<ISelectLanguageProps> = ({ lng }) => {
  const { t } = useTranslation(lng);
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const name = user?.displayName || user?.email || '?';
  console.log(user, isLoggedIn);
  const signOut = async () => {
    await signOutUser();
  };

  const handleSignIn = () => {
    router.push(`/${lng}/signin`);
  };

  const handleSignOut = () => {
    router.push(`/${lng}/signup`);
  };

  return isLoggedIn ? (
    <>
      <Avatar {...stringAvatar(name)} sx={{ bgcolor: deepOrange[500] }} />
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
    <>
      <Button
        size="medium"
        variant="contained"
        color="info"
        onClick={handleSignIn}
        endIcon={<ExitToAppIcon />}
      >
        {t('header.login')}
      </Button>
      <Button
        size="medium"
        variant="contained"
        color="error"
        onClick={handleSignOut}
        endIcon={<VpnKeyIcon />}
      >
        {t('header.signUp')}
      </Button>
    </>
  );
};

export default SignInButton;
