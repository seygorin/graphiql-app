import { useTranslations } from 'next-intl';
import React from 'react';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Button from '@mui/material/Button';
import ROUTES from '../../shared/types/types';

const SignUpButton: React.FC = () => {
  const t = useTranslations();

  return (
    <Button
      variant='contained'
      href={ROUTES.SIGN_UP}
      color='secondary'
      size='medium'
      sx={{
        ':hover': {
          color: 'white',
        },
      }}
      endIcon={<VpnKeyIcon />}
    >
      {t('header.signUp')}
    </Button>
  );
};

export default SignUpButton;
