import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin();

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});


export default withNextIntl(
    withBundleAnalyzer({
      reactStrictMode: false,
      eslint: {
        ignoreDuringBuilds: true,
      },
      experimental: {
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
      },
    })
);
