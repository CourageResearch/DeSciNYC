/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "i3.ytimg.com",
      },
      {
        hostname: "flowbite.s3.amazonaws.com",
      },
      {
        hostname: "picsum.photos",
      },

      {
        hostname: "images.lumacdn.com",
      },
    ],
  },
};

export default nextConfig;
