/** @type {import('next').NextConfig} */

const nextConfig = {

    env: {
        USE_HTTPS: process.env.USE_HTTPS ?? true,
        UNITY_BASE_URI : process.env.UNITY_BASE_URI ?? 'localhost:3000',
        UNITY_API_BASE_URI : process.env.UNITY_API_BASE_URI ?? 'localhost:3030',
        STATUS_SITE_URL : process.env.STATUS_SITE_URL ?? "http://localhost:3051/dashboard/3",
        SITE_TITLE : process.env.SITE_TITLE ?? "ARC UNITY",
        SITE_DESCRIPTION_META : process.env.SITE_DESCRIPTION_META?? "Arc unity dashboard dev version",
        SITE_DESCRIPTION : process.env.SITE_DESCRIPTION?? `Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                    doloremque mollitia fugiat omnis! Porro facilis quo animi
                    consequatur. Explicabo.`,
        SITE_HERO_IMAGE : process.env.SITE_HERO_IMAGE?? "https://shadcnblocks.com/images/block/placeholder-1.svg"
    }
    
};

export default nextConfig;
