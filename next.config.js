/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    SITE_URL: 'example.com',
    SITE_TITLE: 'Example Website',
    SITE_DESCRIPTION: 'This is my example website!'
  }
}

const { withKeystone } = require("@keystone-6/core/next");

module.exports = withKeystone(nextConfig);