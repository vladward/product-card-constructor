import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/tablecrm/:path*',
        destination: 'https://app.tablecrm.com*', // Проксируем запросы
      },
    ];
  },
};

export default nextConfig;
