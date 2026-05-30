import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // 將工作區根目錄鎖定在本專案，避免 Next.js 因偵測到
  // 上層 (C:\Users\Samura) 的 lockfile 而推斷出錯誤的根目錄。
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
