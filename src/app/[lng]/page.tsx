import Button from 'components/Button';
import Header from 'components/Header';
import Input from 'components/Input';

import { useTranslation } from '../i18n';
import { RootLayoutPropsType } from './layout';

export default async function Home({ params: { lng } }: RootLayoutPropsType) {
  const { t } = await useTranslation(lng);
  return (
    <main>
      <Header lng={lng} />
      <Button>{t('component.button')}</Button>
      <Input placeholder={t('component.input')} />
    </main>
  );
}
