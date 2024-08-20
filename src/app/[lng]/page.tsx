import Button from 'components/Button';
import Input from 'components/Input';
import { useTranslation } from 'i18n/hook';

import { RootLayoutPropsType } from './layout';

export default async function Home({ params: { lng } }: RootLayoutPropsType) {
  const { t } = await useTranslation(lng);
  return (
    <main>
      <Button>{t('component.button')}</Button>
      <Input placeholder={t('component.input')} />
    </main>
  );
}
