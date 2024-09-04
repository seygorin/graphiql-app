// 'use client'
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { errorNotifyMessage } from 'utils/notifyMessage';
import googleIcon from '../../assets/google.png';
import { signInWithGoogle } from '../../lib/auth';

/**
 *
 * https://github.com/vercel/next.js/discussions/51135
 * https://github.com/firebase/firebase-js-sdk/issues/8213
 */

const SignInWithGoogle: React.FC = () => {
  const t = useTranslations();

  // const router = useRouter();
  const signInGoogle = async () => {
    try {
      await signInWithGoogle(t);
      // router.push(ROUTES.MAIN_PAGE);
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
      <Typography sx={{ mt: 1 }} component="h2" variant="body2" color="textSecondary">
        {t('form.subtitle.google')}
      </Typography>
      <Box
        style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
        onClick={signInGoogle}
      >
        {/* <Image src={googleIcon} width={200} style={{ height: 'auto' }} alt="google" /> */}
        <Image src={googleIcon} width={200} height={50} alt="google" />
      </Box>
    </Box>
  );
};

export default SignInWithGoogle;
