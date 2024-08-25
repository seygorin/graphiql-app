import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Stack } from '@mui/material';
import { AuthProvider } from 'hooks/useAuth';
import logo from 'public/logo-rsschool3.png';
import Buttons from './Buttons';
import s from './Header.module.scss';
import SelectLanguage from './SelectLanguage';

const Header: React.FC = () => {
  return (
    <header className={s.header_wrapper}>
      <div className={s.header}>
        <Stack direction="row" gap={2}>
          <Link href="/">
            <Image src={logo} width={110} height={110} alt="logoRsSchool" />
          </Link>
          <SelectLanguage />
        </Stack>
        <Stack direction="row" gap={2}>
          <AuthProvider>
            <Buttons />
          </AuthProvider>
        </Stack>
      </div>
    </header>
  );
};

export default Header;
