import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serverless mode — required for middleware (password protection) and API routes
  trailingSlash: true,
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
