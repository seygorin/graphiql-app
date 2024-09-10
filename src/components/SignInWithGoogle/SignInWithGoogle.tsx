import { useTranslations } from 'next-intl';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GoogleSignInButton from 'components/GoogleSignInButton/GoogleSignInButton';
import { errorNotifyMessage } from 'utils/notifyMessage';
import { signInWithGoogle } from '../../lib/auth';

const SignInWithGoogle: React.FC = () => {
  const t = useTranslations();

  const signInGoogle = async () => {
    try {
      await signInWithGoogle(t);
    } catch (err) {
      if (err instanceof Error) {
        errorNotifyMessage(t(err.message));
      }
    }
  };

  return (
    <Box
      sx={{
        marginTop: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography sx={{ mt: 1 }} component='h2' variant='body2' color='textSecondary'>
        {t('form.subtitle.google')}
      </Typography>
      <Box style={{ display: 'flex', justifyContent: 'center' }} onClick={signInGoogle}>
        <GoogleSignInButton title={t('form.button.google')} />
      </Box>
    </Box>
  );
};

export default SignInWithGoogle;
