/** @type {import('next').NextConfig} */

const BASE_URL = process.env.UNITY_BASE_URI
const DEBUG = Boolean(process.env.UNITY_DEBUG)



const nextConfig = {

    rewrites : async () => {
        return DEBUG? [
            {
                source: '/api/:path*',
                destination: `http://${BASE_URL}/api/:path*`
            },
            {
                source: '/v2/api/:path*',
                destination: `http://${BASE_URL}/v2/api/:path*`
            },
            {
                source: '/auth/:path*',
                destination: `http://${BASE_URL}/auth/:path*`
            }
        ] : []
    }
    
};

export default nextConfig;
