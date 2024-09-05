import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { Link } from '@mui/material';
import courseLogo from 'public/rss-logo.svg';
import s from './Footer.module.scss';

const Footer: React.FC = () => {
  const t = useTranslations();

  return (
    <footer className={s.footer_wrapper}>
      <div className={s.footer_info}>
        <div className={s.footer_links}>
          <Link variant='body1' className={s.link} href='https://github.com/intrstng'>
            Intrstng
          </Link>

          <Link variant='body1' className={s.link} href='https://github.com/seygorin'>
            seygorin
          </Link>

          <Link variant='body1' className={s.link} href='https://github.com/ksushasher'>
            KsushaSher
          </Link>
        </div>
        <div className={s.year}>2024 {t('footer.year')}</div>
        <Link href='https://rs.school/' width={50} height={50}>
          <Image src={courseLogo} width={50} height={50} alt='courseLogo' />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
