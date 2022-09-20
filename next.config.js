/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.iwantalipstick.com"],
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
