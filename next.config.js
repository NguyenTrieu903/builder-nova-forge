/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure webpack
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Preserve existing configurations
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '.',
    };
    
    return config;
  },
  
  // Output configuration
  distDir: 'dist',
  
  // Image optimization
  images: {
    unoptimized: false,
    domains: [],
  },
  
  // Enable React strict mode
  reactStrictMode: true,
  
  // Configure trailing slashes
  trailingSlash: false,
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Redirects and rewrites can be added here
  async redirects() {
    return [];
  },
  
  async rewrites() {
    return [];
  },
};

export default nextConfig;