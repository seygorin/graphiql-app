import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import Footer from 'components/Footer';
import Header from 'components/Header';
import { AuthProvider } from 'hooks/useAuth';
import { LANGUAGES, LanguageType } from 'i18n/settings';
import { dir } from 'i18next';
import '../../styles/_reset.css';
import '../../styles/globals.scss';
import theme from '../../theme/theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GraphiQL App',
  description: 'GraphiQL application with RESTful client',
};

export async function generateStaticParams() {
  return LANGUAGES.map((lng) => ({ lng }));
}

export type RootLayoutPropsType = Readonly<{
  children: React.ReactNode;
  params: { lng: LanguageType };
}>;

export default function RootLayout({ children, params: { lng } }: RootLayoutPropsType) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <Header lng={lng} />
              {children}
              <Footer lng={lng} />
            </ThemeProvider>
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
