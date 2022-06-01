/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    customKey: 'my-value',
  }
}

const { withKeystone } = require("@keystone-6/core/next");

module.exports = withKeystone(nextConfig);