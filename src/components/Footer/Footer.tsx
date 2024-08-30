import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { Box, Container, Link } from '@mui/material';
import courseLogo from 'public/rss-logo.svg';
import s from './Footer.module.scss';

const Footer: React.FC = () => {
  const t = useTranslations();

  return (
    <Container component='footer' className={s.footer_wrapper} disableGutters maxWidth={false}>
      <Box maxWidth='lg' className={s.footer}>
        <div className={s.footer_links}>
          <p>
            <Link variant='body1' href='https://github.com/intrstng'>
              Intrstng
            </Link>
          </p>
          <p>
            <Link variant='body1' href='https://github.com/seygorin'>
              seygorin
            </Link>
          </p>
          <p>
            <Link variant='body1' href='https://github.com/ksushasher'>
              KsushaSher
            </Link>
          </p>
        </div>
        <div className={s.year}>2024 {t('footer.year')}</div>
        <Link href='https://rs.school/'>
          <Image src={courseLogo} width={40} height={40} alt='courseLogo' />
        </Link>
      </Box>
    </Container>
  );
};

export default Footer;
