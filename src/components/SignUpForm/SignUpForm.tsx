'use client';

import { useTranslations } from 'next-intl';
import React, { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import HowToRegIcon from '@mui/icons-material/HowToReg';
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
import PasswordStrength from 'components/PasswordStrength';
import { errorNotifyMessage } from 'utils/notifyMessage';
import { signUpUser } from '../../lib/auth';
import ROUTES from '../../shared/types/types';
import { ISignUpFormData, validateSignUpSchema } from '../../validations/signUpValidation.shema';
import s from './SignUpForm.module.css';

const SignUpForm = () => {
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const onClickShowPassword = () => setShowPassword((show) => !show);
  const onMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const onClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const onMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ISignUpFormData>({
    mode: 'all',
    // mode: 'onBlur',
    resolver: yupResolver(validateSignUpSchema(t)),
  });

  const onSubmit: SubmitHandler<ISignUpFormData> = async (data) => {
    try {
      await signUpUser(data.name, data.email, data.password, t);
      // router.push(ROUTES.MAIN_PAGE);
      reset();
    } catch (err) {
      if (err instanceof Error) {
        errorNotifyMessage(t(err.message));
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          paddingTop: 6,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'success.main' }} variant="rounded">
          <HowToRegIcon />
        </Avatar>
        <Typography component="h2" variant="h5">
          {t('form.title.signUp')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormGroup>
            <FormControl fullWidth sx={{ position: 'relative' }}>
              <TextField
                label={t('form.name')}
                type="text"
                margin="normal"
                fullWidth
                id="name"
                variant="outlined"
                {...register('name')}
                autoComplete="name"
                size="small"
              />
              {errors?.name && (
                <p className={`error_form ${s.error_name}`}>{errors.name.message}</p>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ position: 'relative' }}>
              <TextField
                label={t('form.email')}
                type="email"
                margin="normal"
                fullWidth
                id="emailSignUp"
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
            <FormControl
              sx={{ mb: '0.4rem', position: 'relative' }}
              variant="outlined"
              size="small"
            >
              <InputLabel htmlFor="passwordSignUp">{t('form.password')}</InputLabel>
              <OutlinedInput
                id="passwordSignUp"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                autoComplete="current-password"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
              {errors?.password && (
                <p className={`error_form ${s.error_pass}`}>{errors.password.message}</p>
              )}
            </FormControl>

            <PasswordStrength password={password} />

            <FormControl sx={{ mt: '2rem', position: 'relative' }} variant="outlined" size="small">
              <InputLabel htmlFor="confirmPassword">{t('form.confirmPassword')}</InputLabel>
              <OutlinedInput
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                autoComplete="current-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirmPassword visibility"
                      onClick={onClickShowConfirmPassword}
                      onMouseDown={onMouseDownConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={t('form.confirmPassword')}
              />
              {errors?.confirmPassword && (
                <p className={`error_form ${s.error_confirm_pass}`}>
                  {errors.confirmPassword.message}
                </p>
              )}
            </FormControl>
            <Button
              sx={{ mt: 3, mb: 1 }}
              type="submit"
              variant="contained"
              fullWidth
              disabled={!isValid}
              color="info"
            >
              {t('form.button.signUp')}
            </Button>
          </FormGroup>
          <Grid container>
            <Grid item>
              <Link href={ROUTES.SIGN_IN} variant="subtitle2" underline="hover">
                {t('form.subtitle.signUp')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpForm;
