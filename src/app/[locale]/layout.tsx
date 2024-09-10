import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { Container } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import ComponentError from 'components/ComponentError/ComponentError';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import Footer from 'components/Footer';
import Header from 'components/Header';
import ToastifyNotification from 'components/ToastifyNotification';
import { locales } from 'i18n/config';
import theme from '../../theme/theme';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface IProps {
  children: ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ children, params: { locale } }: IProps) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <title>EST/GraphiQL Client</title>
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <Header />
              <Container
                component='main'
                maxWidth={false}
                disableGutters
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <ErrorBoundary fallback={<ComponentError />}>{children}</ErrorBoundary>
              </Container>
              <Footer />
              <ToastifyNotification />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
