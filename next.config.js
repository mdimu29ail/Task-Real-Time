/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: 'C:\\Users\\MD Imu\\Desktop\\jobTask',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow all HTTPS hosts
      },
      {
        protocol: 'http',
        hostname: '**', // allow all HTTP hosts (optional)
      },
    ],
  },
};

module.exports = nextConfig;
