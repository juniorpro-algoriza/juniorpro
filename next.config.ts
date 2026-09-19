import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev-api.sawiha.com",
      },
      {
        protocol: "https",
        hostname: "juniorpro-001-site1.ntempurl.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
