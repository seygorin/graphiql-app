'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { locales } from 'i18n/config';

const SelectLanguage: React.FC = () => {
  const router = useRouter();
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  const handleChange = ({ target }: SelectChangeEvent) => {
    router.replace(`/${target.value}/${pathname.split('/').slice(2).join('/')}`);
  };

  return (
    <FormControl>
      <InputLabel htmlFor="select-language">{t('header.select.language')}</InputLabel>
      <Select
        id="select-language"
        variant="outlined"
        size="small"
        value={locale}
        label={t('header.select.language')}
        onChange={handleChange}
      >
        {locales.map((l) => (
          <MenuItem key={l} value={l}>
            {t(l)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectLanguage;
