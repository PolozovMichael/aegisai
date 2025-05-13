import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://assets.aceternity.com/**')],
  },
}

export default nextConfig
