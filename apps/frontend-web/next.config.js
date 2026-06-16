/** @type {import('next').NextConfig} */
const nextConfig = {
    outputFileTracingIncludes: {
        "/api/auth/**": ["../../packages/db/src/generated/client/**/*"],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
            },
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
};

export default nextConfig;
