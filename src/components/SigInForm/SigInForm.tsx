'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
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
import { LanguageType } from 'i18n/settings';
import { signInUser } from '../../lib/auth';
import { SignInFormData, validateSignInSchema } from '../../validations/signInValidation.schema';
import s from './SignInForm.module.css';

const SignInForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [, setloginError] = useState<string | null>(null);
  const onClickShowPassword = () => setShowPassword((show) => !show);
  const onMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const pathname = usePathname();
  const lng = pathname.split('/')[1] as LanguageType;
  const signUpHref = `/${lng}/signup`;
  const { t } = useTranslation(lng);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SignInFormData>({
    // mode: 'all',
    mode: 'onBlur',
    resolver: yupResolver(validateSignInSchema(t)),
  });

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    try {
      await signInUser(data.email, data.password);
      router.push(`/${lng}`); // Main page
      reset();
    } catch (error) {
      console.error('Error logging in:', error);
      setloginError(error.message);
    }
  };

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
              <Link href={signUpHref} variant="subtitle2" underline="hover">
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

export default SignInForm;
