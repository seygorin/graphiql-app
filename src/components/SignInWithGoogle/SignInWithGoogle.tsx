// 'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ISelectLanguageProps } from 'components/Header/SelectLanguage';
import useTranslation from 'i18n/client';
import googleIcon from '../../assets/google.png';
import { signInWithGoogle } from '../../lib/auth';

/**
 *
 * https://github.com/vercel/next.js/discussions/51135
 * https://github.com/firebase/firebase-js-sdk/issues/8213
 */

const SignInWithGoogle: FC<ISelectLanguageProps> = ({ lng }) => {
  const { t } = useTranslation(lng);

  const router = useRouter();
  const signInGoogle = async () => {
    try {
      await signInWithGoogle();
      router.push('/');
      console.log('Sign in with Google account successful');
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        // Show error
        router.push('/signin'); // refactor later if needed
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
      <Typography sx={{ mt: 1 }} component="h2" variant="body2" color="textSecondary">
        {t('form.subtitle.google')}
      </Typography>
      <Box
        style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
        onClick={signInGoogle}
      >
        <Image src={googleIcon.src} width={200} height={50} alt="google" />
      </Box>
    </Box>
  );
};

export default SignInWithGoogle;
