'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import clsx from 'clsx';
import { User } from 'firebase/auth';
import CustomDashboardTabs from 'components/CustomDashboardTabs';
import SignInButton from 'components/SignInButton';
import SignUpButton from 'components/SignUpButton';
import screenshot1 from 'public/screenshot_1.png';
import screenshot2 from 'public/screenshot_2.png';
import screenshot3 from 'public/screenshot_3.png';
import withUser from 'utils/withUser';
import theme from '../../theme/theme';
import AboutUs from './AboutUs';
import s from './Main.module.scss';

const STYLES = {
  box1: {
    maxWidth: 'lg',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    flexGrow: 1,
    width: '100%',
    padding: 4,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
};

interface IProps {
  user?: User | null;
  name?: string | null;
}

const Main: React.FC<IProps> = ({ user, name }) => {
  const t = useTranslations();

  if (user) {
    return (
      <Container maxWidth={false} disableGutters>
        <Box className={s.accent_background}>
          <Box sx={STYLES.box1}>
            <Box
              className={s.main_info_content}
              sx={{ [theme.breakpoints.down('md')]: { width: '100%', textAlign: 'center' } }}
            >
              <Typography
                variant='h1'
                className={s.main_info_title}
                sx={{
                  [theme.breakpoints.down('sm')]: { fontSize: '3.6rem' },
                }}
              >
                {t('main.welcomeUser')},
                <span className={s.title_name}> {name || user.displayName || user.email}!</span>
              </Typography>

              <Typography variant='h6'>{t('main.text')}</Typography>
              <CustomDashboardTabs size='large' />
            </Box>
            <Box
              className={s.main_info_img_wrapper}
              sx={{ [theme.breakpoints.down('md')]: { flexGrow: '0' } }}
            >
              <Box
                className={s.main_info_img}
                sx={{ [theme.breakpoints.down('md')]: { display: 'none', position: 'absolute' } }}
              >
                <Image
                  src={screenshot1}
                  className={clsx(s.main_img_screenshot, s.main_img_screenshot3)}
                  alt='screenshot1'
                />
                <Image
                  src={screenshot2}
                  className={clsx(s.main_img_screenshot, s.main_img_screenshot2)}
                  alt='screenshot2'
                />
                <Image
                  src={screenshot3}
                  className={clsx(s.main_img_screenshot, s.main_img_screenshot1)}
                  alt='screenshot3'
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <AboutUs />
      </Container>
    );
  }

  return (
    <Box className={s.main_not_auth}>
      <Typography
        variant='h1'
        textAlign='center'
        fontSize='5.5rem'
        sx={{ textTransform: 'uppercase' }}
      >
        {t('main.welcome')}
      </Typography>
      <Stack direction='row' gap={2} alignSelf='center' justifyContent='center'>
        <SignInButton />
        <SignUpButton />
      </Stack>
    </Box>
  );
};

export default withUser(Main);
