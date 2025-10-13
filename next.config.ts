import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    webpackBuildWorker: false,
  },
  webpack: (config) => {
    config.watchOptions = {
      ignored: [
        "**/node_modules/**",
        "**/.next/**",
        "**/AppData/**",
        "**/Application Data/**", // Note: If this is a symlink or specific folder, confirm it exists; otherwise, remove if unnecessary
        "C:/Users/Yousof/**", // Use forward slashes
        "C:/Users/Yousof/AppData/**", // Use forward slashes
      ],
    };

    config.resolve = {
      ...config.resolve,
      symlinks: false,
    };

    return config;
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
