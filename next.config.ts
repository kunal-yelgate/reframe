import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: process.cwd(),
  // Required for ffmpeg.wasm to load WASM files correctly
  // Without this, Next.js might try to process .wasm files and break them
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  turbopack: {},
};

export default nextConfig;