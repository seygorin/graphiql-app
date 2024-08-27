'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import clsx from 'clsx';
import logo from 'public/logo-rsschool3.png';
import ROUTES from '../../shared/types/types';
import Buttons from './Buttons';
import s from './Header.module.scss';
import SelectLanguage from './SelectLanguage';

const Header: React.FC = () => {
  const [fix, setFix] = useState(false);

  function setFixed() {
    if (window.scrollY >= 20) {
      setFix(true);
    } else {
      setFix(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', setFixed);
    return () => window.addEventListener('scroll', setFixed);
  }, []);

  return (
    <header className={clsx(s.header_wrapper, fix && s.fixed)}>
      <div className={s.header}>
        <Stack direction="row" gap={2}>
          <Link href={ROUTES.MAIN_PAGE}>
            <Image src={logo} width={110} style={{ height: 'auto' }} alt="logoRsSchool" />
          </Link>
          <SelectLanguage />
        </Stack>
        <Stack direction="row" gap={2}>
          <Buttons />
        </Stack>
      </div>
    </header>
  );
};

export default Header;
