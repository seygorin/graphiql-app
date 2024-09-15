'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { FormControl, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { locales } from 'i18n/config';
import withUser from 'utils/withUser';

const SelectLanguage: React.FC = () => {
  const router = useRouter();
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  const handleChange = (_: React.MouseEvent, value: string) => {
    router.replace(`/${value}/${pathname.split('/').slice(2).join('/')}`);
  };

  return (
    <FormControl>
      <ToggleButtonGroup
        size='small'
        color='primary'
        value={locale}
        exclusive
        onChange={handleChange}
      >
        {locales.map((l) => (
          <ToggleButton key={l} value={l}>
            {t(l)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </FormControl>
  );
};

export default withUser(SelectLanguage, false);
