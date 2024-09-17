'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Box, Container, Stack, Theme, useMediaQuery } from '@mui/material';
import logo from 'public/logo-rsschool3.png';
import ROUTES from '../../shared/types/types';
import theme, { ADDITION_COLOR } from '../../theme/theme';
import Avatar from './Avatar';
import Buttons from './Buttons';
import FadeMenu from './FadeMenu';
import SelectLanguage from './SelectLanguage';

const getStyles = (fixed: boolean) => ({
  wrapper: {
    height: ADDITION_COLOR.headerHeight,
    position: 'sticky',
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 5px 70px 2px rgba(98, 98, 98, 0.25)',
    transition: '0.5s',
    zIndex: 2,
    ...(fixed && {
      backgroundColor: ADDITION_COLOR.backgroundMain,
      borderBottom: `2px solid ${ADDITION_COLOR.borderFooter}`,
      boxShadow: 'none',
    }),
  },
  header: {
    width: '1200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0 auto',
    gap: '30px',
    padding: '16px',
  },
  logoImg: {
    width: { xl: 100, sm: 85, xs: 73 },
    [theme.breakpoints.down('md')]: { width: 70, objectFit: 'contain', height: '100%' },
  },
});

const Header: React.FC = () => {
  const [fix, setFix] = useState(false);
  const styles = getStyles(fix);

  const isSmallScreen = useMediaQuery((t: Theme) => t?.breakpoints.down('md'));

  const setFixed = () => {
    if (window.scrollY >= 20) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', setFixed);
    return () => window.addEventListener('scroll', setFixed);
  }, []);

  return (
    <Container component='header' sx={styles.wrapper} disableGutters maxWidth={false}>
      <Box sx={styles.header}>
        <Stack direction='row' alignItems='center' gap={2}>
          <Link href={ROUTES.MAIN_PAGE}>
            <Box sx={styles.logoImg}>
              <Image
                src={logo}
                width={0}
                height={0}
                sizes='100vw'
                style={{ width: '100%', height: 'auto' }}
                alt='logoRsSchool'
                priority
              />
            </Box>
          </Link>
        </Stack>
        <Stack direction='row' gap={2}>
          {isSmallScreen ? (
            <>
              <Avatar />
              <FadeMenu />
            </>
          ) : (
            <>
              <Avatar />
              <SelectLanguage />
              <Buttons />
            </>
          )}
        </Stack>
      </Box>
    </Container>
  );
};

export default Header;
