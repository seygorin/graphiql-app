import { Input } from '@mui/material';
import useTranslation from 'i18n/server';
import { LanguageType } from 'i18n/settings';

export type HomeProps = {
  params: { lng: LanguageType };
};

export default async function Home({ params: { lng } }: HomeProps) {
  const { t } = await useTranslation(lng);
  return (
    <main>
      <Input placeholder={t('component.input')} />
    </main>
  );
}
