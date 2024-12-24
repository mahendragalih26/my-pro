import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows images from any domain with HTTPS
      },
      {
        protocol: "http",
        hostname: "**", // Allows images from any domain with HTTP
      },
    ],
  },
}

export default nextConfig
