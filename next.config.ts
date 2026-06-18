import type { NextConfig } from "next";

// const BACKEND = env.BACK_END_URL.replace(/\/?$/, "");

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: { root: process.cwd() },
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: `/:path*`,
      },
    ];
  },
};

export default nextConfig;
