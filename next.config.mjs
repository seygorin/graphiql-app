/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  // Specify a custom path here
  './src/i18n/i18n.ts',
);
const nextConfig = {};

export default withNextIntl(nextConfig);
