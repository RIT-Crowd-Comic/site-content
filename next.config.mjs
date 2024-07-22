/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost', //update to s3 database instead of local when ready
            port: '5000',
          },
        ],
      },
};

export default nextConfig;
