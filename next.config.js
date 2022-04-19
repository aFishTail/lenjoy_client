/** @type {import('next').NextConfig} */
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, {dev, isServer}) => {
    config.resolve.plugins.push(new TsconfigPathsPlugin())
    return config
  },
  images: {
    domains: ['bit.ly']
  }
}

module.exports = nextConfig
