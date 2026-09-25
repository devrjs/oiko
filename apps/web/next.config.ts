import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    '*.trycloudflare.com',
    '192.168.0.115',
    'localhost',
    '127.0.0.1',
  ],
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: `${process.env.INTERNAL_BACKEND_API_URL || 'http://localhost:3333'}/api/auth/:path*`,
      },
    ]
  },
}

export default nextConfig
