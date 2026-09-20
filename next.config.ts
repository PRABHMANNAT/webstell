import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    // Static Vercel exports do not have a /_next/image optimizer endpoint.
    // Serve files from public/assets directly so production matches local.
    unoptimized: true,
  },
};

export default nextConfig;
