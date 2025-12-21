/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Note: PHP files are served separately by a PHP server
  // The frontend uses API_ENDPOINTS from app/lib/api.ts
  // Configure NEXT_PUBLIC_API_BASE_URL environment variable to point to your PHP server
};

module.exports = nextConfig;

