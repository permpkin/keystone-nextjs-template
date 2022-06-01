/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    customKey: 'my-value',
  }
}

module.exports = nextConfig
