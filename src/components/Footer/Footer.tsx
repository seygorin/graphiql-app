import Image from 'next/image';
import React from 'react';
import { Link } from '@mui/material';
import useTranslation from 'i18n/server';
import { LanguageType } from 'i18n/settings';
import courseLogo from 'public/rss-logo.svg';
import s from './Footer.module.scss';

interface IHeaderProps {
  lng: LanguageType;
}

const Footer: React.FC<IHeaderProps> = async ({ lng }) => {
  const { t } = await useTranslation(lng);

  return (
    <footer className={s.footer_wrapper}>
      <div className={s.footer}>
        <div className={s.footer_links}>
          <p>
            <Link href="https://github.com/intrstng">Intrstng</Link>
          </p>
          <p>
            <Link href="https://github.com/seygorin">seygorin</Link>
          </p>
          <p>
            <Link href="https://github.com/ksushasher">KsushaSher</Link>
          </p>
        </div>
        <div className={s.year}>2024 {t('footer.year')}</div>
        <Link href="https://rs.school/">
          <Image src={courseLogo} width={40} height={40} alt="courseLogo" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
