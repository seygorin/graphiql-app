'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import useTranslation from 'i18n/client';
import { LANGUAGES, LanguageType } from 'i18n/settings';

interface ISelectLanguageProps {
  lng: LanguageType;
}
const SelectLanguage: React.FC<ISelectLanguageProps> = ({ lng }) => {
  const router = useRouter();
  const { t } = useTranslation(lng);

  const handleChange = (event: SelectChangeEvent) => {
    router.push(`/${event.target.value}`);
  };

  return (
    <FormControl className="select_language">
      <InputLabel id="demo-simple-select-label">{t('header.select.language')}</InputLabel>
      <Select
        variant="outlined"
        size="small"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={lng}
        label={t('header.select.language')}
        onChange={handleChange}
      >
        {LANGUAGES.map((l) => (
          <MenuItem key={l} value={l}>
            {t(l)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectLanguage;
