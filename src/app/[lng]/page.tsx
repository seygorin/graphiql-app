import { Input } from '@mui/material';
import { useTranslation } from 'i18n/server';
import { RootLayoutPropsType } from './layout';

export default async function Home({ params: { lng } }: RootLayoutPropsType) {
  const { t } = await useTranslation(lng);
  return (
    <main>
      <Input placeholder={t('component.input')} />
    </main>
  );
}
