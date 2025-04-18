/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['imgur.com', 'i.imgur.com'],
    unoptimized: true,
  },
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig;
