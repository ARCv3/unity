/** @type {import('next').NextConfig} */

const BASE_URL = "stage.billiecord.com"

const nextConfig = {
    output: 'standalone',
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `https://${BASE_URL}/api/:path*`
            },
            {
                source: '/auth/:path*',
                destination: `https://${BASE_URL}/auth/:path*`
            }
        ]
    }
};

export default nextConfig;
