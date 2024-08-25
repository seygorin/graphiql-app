import 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Container } from '@mui/material';
import Main from 'components/Main';
import { AuthProvider } from 'hooks/useAuth';
import { LocaleType } from 'i18n/config';

type Props = {
  params: { locale: LocaleType };
};

export default function Page({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  return (
    <Container component="main" maxWidth="md">
      <AuthProvider>
        <Main />
      </AuthProvider>
    </Container>
  );
}
