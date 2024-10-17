/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['aceternity.com', 'images.unsplash.com']
  }
}

export default nextConfig
