import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import loadSpinner from '../../assets/load-spinner-red.gif';
import s from './Loader.module.css';

const Loader = () => {
  const t = useTranslations();

  return (
    <div className={s.loader}>
      <Image src={loadSpinner} alt='loading' width={230} height={230} unoptimized />
      <p className={s.loading}>{t('loader.message')}</p>
    </div>
  );
};

export default Loader;
