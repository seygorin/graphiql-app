import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Stack } from '@mui/material';
import logo from 'public/logo-rsschool3.png';
import ROUTES from '../../shared/types/types';
import Buttons from './Buttons';
import s from './Header.module.scss';
import SelectLanguage from './SelectLanguage';

const Header: React.FC = () => {
  return (
    <header className={s.header_wrapper}>
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
