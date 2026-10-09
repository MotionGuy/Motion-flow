import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Paths from the old Squarespace site, so shared links keep working */
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/schedule", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
