/** @type {import('next').NextConfig} */
const nextConfig = {
  // <-- Define a variable
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  output: 'standalone',
};

// Use the CommonJS export syntax for .js files
module.exports = nextConfig;
