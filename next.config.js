/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, tls: false, dns: false, net: false };
    return config
  },
  env: {
    PRIVATE_KEY: '0xe58c836c1eb3696a8196c731a6b40a98c6494e06a5b44f23b87413b093831f21'
  }
}

module.exports = nextConfig
