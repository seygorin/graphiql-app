import 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Main from 'components/Main';
import { LocaleType } from 'i18n/config';

interface IProps {
  params: { locale: LocaleType };
}

export default function Page({ params: { locale } }: IProps) {
  unstable_setRequestLocale(locale);

  return <Main />;
}
