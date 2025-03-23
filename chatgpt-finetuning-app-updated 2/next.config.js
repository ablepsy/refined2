/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // The app directory is no longer experimental in newer versions
  // but keeping this more compatible with Next.js 13.4.19
}

module.exports = nextConfig
