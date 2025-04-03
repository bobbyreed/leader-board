/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['your-firebase-storage-domain.com'], // If using Firebase Storage
    },
    // For static export (uncomment if needed)
    // output: 'export',
  };

export default nextConfig;
