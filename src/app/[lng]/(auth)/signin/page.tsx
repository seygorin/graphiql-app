'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, InputLabel } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SignInWithGoogle from 'components/SignInWithGoogle/SignInWithGoogle';
import useTranslation from 'i18n/client';
import { signInUser } from '../../../../lib/auth';
import { signInFormData, signInSchema } from '../../../../validations/signInValidation.schema';
import s from './signin.module.css';

const SignIn = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const onClickShowPassword = () => setShowPassword((show) => !show);
  const onMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const pathname = usePathname();
  const lng = pathname.split('/')[1];
  const { t } = useTranslation(lng);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<signInFormData>({
    // mode: 'all',
    mode: 'onBlur',
    resolver: yupResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<signInFormData> = (data) => {
    signInUser(data.email, data.password);
    router.push('/'); // Change
    reset();
  };

  //   useEffect(() => {
  //     if (user) navigate(/);
  //   }, [user]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 6,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h2" variant="h5">
          {t('form.title.signIn')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormGroup>
            <FormControl fullWidth sx={{ position: 'relative' }}>
              <TextField
                label={t('form.email')}
                type="email"
                margin="normal"
                fullWidth
                id="email"
                variant="outlined"
                sx={{ mb: 3 }}
                // autoFocus
                {...register('email')}
                autoComplete="email"
                size="small"
              />
              {errors?.email && (
                <p className={`error_form ${s.error_mail}`}>{errors.email.message}</p>
              )}
            </FormControl>
            <FormControl sx={{ position: 'relative' }} variant="outlined" size="small">
              <InputLabel htmlFor="password">{t('form.password')}</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                autoComplete="current-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={onClickShowPassword}
                      onMouseDown={onMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={t('form.password')}
              />
              {!isValid && errors?.password && (
                <p className={`error_form ${s.error_pass}`}>{errors.password.message}</p>
              )}
            </FormControl>
            <Button
              sx={{ mt: 4, mb: 1 }}
              type="submit"
              variant="contained"
              fullWidth
              disabled={!isValid}
              color="info"
            >
              {t('form.button.signIn')}
            </Button>
          </FormGroup>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="subtitle2" underline="hover">
                {t('form.subtitle.signIn')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <SignInWithGoogle lng={lng} />
    </Container>
  );
};

export default SignIn;
