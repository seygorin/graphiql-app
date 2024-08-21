import Image from 'next/image';
import { Button } from '@mui/material';
import { useTranslation } from 'i18n/server';
import { LanguageType } from 'i18n/settings';
import logo from 'public/logo-rsschool3.png';
import s from './Header.module.scss';
import SelectLanguage from './SelectLanguage';

interface IHeaderProps {
  lng: LanguageType;
}

const Header: React.FC<IHeaderProps> = async ({ lng }) => {
  const { t } = await useTranslation(lng);

  return (
    <header className={s.header_wrapper}>
      <div className={s.header}>
        <Image src={logo} width={110} height={110} alt="logoRsSchool" />
        <div className={s.left_side_header}>
          <SelectLanguage lng={lng} />
          <Button size="large" variant="contained" min-width="120px">
            {t('header.login')}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
