/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http', // Allow both http and https protocols
                hostname: '**', // This allows all hostnames
                port: '', // Optional, specify if needed
                pathname: '**', // This allows all paths
            },
            {
                protocol: 'https', // Allow both http and https protocols
                hostname: '**', // This allows all hostnames
                port: '', // Optional, specify if needed
                pathname: '**', // This allows all paths
            },
        ],
    },
};

export default nextConfig;
