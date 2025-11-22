import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ==== à supprimer ====
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
  // ====
};

export default nextConfig;
