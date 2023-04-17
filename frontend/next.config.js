/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    url: 'https://employee-invoicing.onrender.com',
  },
};

module.exports = nextConfig;
