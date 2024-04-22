const path = require("node:path");

const cspHeader = `
    default-src 'self';
    connect-src 'self' https://*.flows.sh https://*.flows-cloud.com;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://flows.sh https://*.lemonsqueezy.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src https://flows-sh.lemonsqueezy.com;
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  transpilePackages: ["ui", "icons", "shared"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
    optimizePackageImports: ["ui", "icons", "shared"],
  },
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
