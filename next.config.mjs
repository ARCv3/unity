/** @type {import('next').NextConfig} */

const BASE_URL = process.env.UNITY_BASE_URI
const DEBUG = process.env.UNITY_DEBUG

const nextConfig = {

    rewrites : async () => {
        return DEBUG? [
            {
                source: '/api/:path*',
                destination: `https://${BASE_URL}/api/:path*`
            },
            {
                source: '/auth/:path*',
                destination: `https://${BASE_URL}/auth/:path*`
            }
        ] : []
    }
    
};

export default nextConfig;
