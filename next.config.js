/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/admin',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          }
        ]
      }
    ]
  }
}

const { withKeystone } = require("@keystone-6/core/next");

module.exports = withKeystone(nextConfig);