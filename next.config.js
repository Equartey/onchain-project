const fs = require('fs');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer/'),
      };
    }
    return config;
  },
  experimental: {
    https: {
      key: fs.readFileSync(path.join(__dirname, 'certificates/localhost.key')),
      cert: fs.readFileSync(path.join(__dirname, 'certificates/localhost.crt')),
    },
  },
};

module.exports = nextConfig; 