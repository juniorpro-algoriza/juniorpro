import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/home/projects/1/all",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/home/projects/1/all",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
