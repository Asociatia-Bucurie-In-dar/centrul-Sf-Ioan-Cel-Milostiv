import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});


export default withNextIntl(
    withBundleAnalyzer({
      reactStrictMode: false,
      experimental: {
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
      },
    })
);
