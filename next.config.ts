import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/lib/*": ["./lib/*"],
    },
  },
};

export default nextConfig;
