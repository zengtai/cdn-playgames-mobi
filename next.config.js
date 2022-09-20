/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.iwantalipstick.com"],
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  basePath: "/channel/tpal/v1_beta2",

  generateBuildId: async () => {
    return "20220920";
  },
  trailingSlash: true,
};

module.exports = nextConfig;
