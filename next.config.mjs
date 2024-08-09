/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost', // update to s3 database instead of local when ready
                port:     '5000',
            },
            {
                protocol: 'http',
                hostname: 'http://rit-igm-crowd-comic-s3-bucket.s3.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'https://rit-igm-crowd-comic-s3-bucket.s3.amazonaws.com',
            }
        ],
    },
};

export default nextConfig;
