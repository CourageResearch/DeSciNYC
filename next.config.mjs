/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'images.unsplash.com'
            },
            {
                hostname: 'i3.ytimg.com'
            }
        ],
    },
};

export default nextConfig;
