/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['your-firebase-storage-domain.com'], // If using Firebase Storage
    },
    // For static export (uncomment if needed)
    // output: 'export',
  };

export default nextConfig;
