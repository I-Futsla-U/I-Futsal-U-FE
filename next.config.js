/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plab-football.s3.amazonaws.com",
        port: "",
        pathname: "/media/**",
      },
    ],
  },
};

module.exports = nextConfig;
