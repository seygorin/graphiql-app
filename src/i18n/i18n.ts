import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { LocaleType, locales } from './config';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as LocaleType)) notFound();

  return {
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
