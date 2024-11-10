/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3030/api/:path*'
            },
            {
                source: '/auth/:path*',
                destination: "http://localhost:3030/auth/:path*"
            }
        ]
    }
};

export default nextConfig;
