const path = require("node:path");

// eslint-disable-next-line turbo/no-undeclared-env-vars -- ignore
const dev = process.env.NODE_ENV !== "production";

const cspHeader = `
    default-src 'self';
    connect-src 'self' https://flows.sh https://*.flows.sh https://*.flows-cloud.com https://*.posthog.com${
      dev ? " http://127.0.0.1:3005 http://localhost:3005" : ""
    };
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://flows.sh https://*.lemonsqueezy.com https://challenges.cloudflare.com https://*.posthog.com https://cdn.jsdelivr.net;
    style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
    img-src 'self' blob: data: https://api.producthunt.com;
    font-src 'self' https://cdn.jsdelivr.net;
    worker-src 'self' blob:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src https://flows-sh.lemonsqueezy.com https://challenges.cloudflare.com;
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
      {
        // ProductHunt
        protocol: "https",
        hostname: "api.producthunt.com",
      },
    ],
  },
};

module.exports = nextConfig;
