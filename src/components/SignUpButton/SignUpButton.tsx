import { useTranslations } from 'next-intl';
import React from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';

const SignUpButton: React.FC = () => {
  const t = useTranslations();

  return (
    <Button href="/signup" size="medium" color="info" endIcon={<ExitToAppIcon />}>
      {t('header.signUp')}
    </Button>
  );
};

export default SignUpButton;
