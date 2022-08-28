/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost:3000', 'i.scdn.co'],
  },
  swcMinify: true,
};

export default nextConfig;
