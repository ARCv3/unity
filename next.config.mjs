/** @type {import('next').NextConfig} */

const BASE_URL = process.env.UNITY_API_BASE_URI
const DEBUG = Boolean(process.env.UNITY_DEBUG)

const nextConfig = {

    rewrites : async () => {
        return DEBUG? [
            {
                source: '/api/:path*',
                destination: `${BASE_URL}/api/:path*`
            },
            {
                source: '/v2/api/:path*',
                destination: `${BASE_URL}/v2/api/:path*`
            },
            {
                source: '/auth/:path*',
                destination: `${BASE_URL}/auth/:path*`
            }
        ] : []
    },
    env: {
        UNITY_BASE_URI : process.env.UNITY_BASE_URI ?? 'localhost:3000',
        UNITY_API_BASE_URI : process.env.UNITY_API_BASE_URI ?? 'http://localhost:3030',
        STATUS_SITE_URL : process.env.STATUS_SITE ?? "http://localhost:3051/dashboard/3",
        SITE_TITLE : process.env.SITE_TITLE ?? "ARC UNITY",
        SITE_DESCRIPTION_META : process.env.SITE_DESCRIPTION_META?? "Arc unity dashboard dev version",
        SITE_DESCRIPTION : process.env.SITE_DESCRIPTION?? `Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                    doloremque mollitia fugiat omnis! Porro facilis quo animi
                    consequatur. Explicabo.`,
        SITE_HERO_IMAGE : process.env.SITE_HERO_IMAGE?? "https://shadcnblocks.com/images/block/placeholder-1.svg"
    }
    
};

export default nextConfig;
