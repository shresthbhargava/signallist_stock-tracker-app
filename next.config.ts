import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    allowedDevOrigins: ['http://192.168.56.1:3000'],
};

export default nextConfig;