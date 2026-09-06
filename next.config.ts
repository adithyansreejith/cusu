import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.prismic.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/magazine",
        destination: "/complaints",
        permanent: true,
      },
      {
        source: "/events",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/petition",
        destination: "/petitions",
        permanent: true,
      },
      {
        source: "/petition/:uid",
        destination: "/petitions/:uid",
        permanent: true,
      },
      {
        source: "/community",
        destination: "/clubs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;