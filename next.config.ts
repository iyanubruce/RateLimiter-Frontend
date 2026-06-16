import type { NextConfig } from "next";
import env from "./src/config";

const BACKEND = env.BACK_END_URL.replace(/\/?$/, "");

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: { root: process.cwd() },
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: `${BACKEND}/:path*`,
      },
    ];
  },
};

export default nextConfig;
