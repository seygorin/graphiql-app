import { useTranslations } from 'next-intl';
import React from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';
import ROUTES from '../../shared/types/types';

const SignInButton: React.FC = () => {
  const t = useTranslations();

  return (
    <Button
      size="medium"
      variant="contained"
      color="info"
      endIcon={<ExitToAppIcon />}
      href={ROUTES.SIGN_IN}
    >
      {t('header.login')}
    </Button>
  );
};

export default SignInButton;
