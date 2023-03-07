/**
 * @type {import('next').NextConfig}
 */

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.barbora.ee',
                port: '',
                pathname: '/products/**',
            },
        ],
    },
  }