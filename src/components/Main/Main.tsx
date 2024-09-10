'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { User } from 'firebase/auth';
import SignInButton from 'components/SignInButton';
import SignUpButton from 'components/SignUpButton';
import screenshot1 from 'public/screenshot_1.png';
import screenshot2 from 'public/screenshot_2.png';
import screenshot3 from 'public/screenshot_3.png';
import withUser from 'utils/withUser';
import AboutUs from './AboutUs';
import CustomDashboardTabsMain from './CustomDashboardTabsMain';
import { STYLES } from './styles.main';

interface IProps {
  user?: User | null;
  name?: string | null;
}

const Main: React.FC<IProps> = ({ user, name }) => {
  const t = useTranslations();

  // useEffect(() => {
  //   throw new Error('Synthetic error for testing Error Boundary');
  // }, []);

  if (user) {
    return (
      <Container maxWidth={false} disableGutters>
        <Box sx={STYLES.background}>
          <Box sx={STYLES.info}>
            <Box sx={STYLES.infoContent}>
              <Typography variant='h1' sx={STYLES.infoTitle}>
                {t('main.welcomeUser')},
                <Box component='span' sx={STYLES.infoTitleName}>
                  {' '}
                  {name || user.displayName || user.email}!
                </Box>
              </Typography>

              <Typography variant='h6'>{t('main.text')}</Typography>
              <CustomDashboardTabsMain />
            </Box>

            <Box sx={STYLES.infoImgWrapper}>
              <Box sx={STYLES.infoImg}>
                <Box sx={{ ...STYLES.imgScreenshot3, ...STYLES.img }}>
                  <Image src={screenshot1} alt='screenshot1' width={400} priority />
                </Box>
                <Box sx={{ ...STYLES.imgScreenshot2, ...STYLES.img }}>
                  <Image src={screenshot2} alt='screenshot2' width={400} priority />
                </Box>
                <Box sx={{ ...STYLES.imgScreenshot1, ...STYLES.img }}>
                  <Image src={screenshot3} alt='screenshot3' width={400} priority />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <AboutUs />
      </Container>
    );
  }

  return (
    <Box sx={STYLES.notAuth}>
      <Typography sx={STYLES.notAuthTitle} variant='h1'>
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
