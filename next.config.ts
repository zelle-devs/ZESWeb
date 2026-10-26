import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,

  allowedDevOrigins: [
    "localhost:3000",
    "192.168.18.10:3000",
    "192.168.18.10",
  ],
};

export default nextConfig;