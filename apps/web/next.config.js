const { createContentlayerPlugin } = require("next-contentlayer");

const path = require("node:path");

const withContentlayer = createContentlayerPlugin();

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  // eslint-disable-next-line turbo/no-undeclared-env-vars -- ignore
  enabled: process.env.ANALYZE === "true",
});

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://api.producthunt.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
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
        // For placeholder images
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        // ProductHunt
        protocol: "https",
        hostname: "api.producthunt.com",
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/box/script.js",
        destination: "https://plausible.io/js/script.js",
      },
      {
        source: "/box/event",
        destination: "https://plausible.io/api/event",
      },
    ];
  },
  redirects() {
    return [
      {
        source: "/join-slack",
        destination:
          "https://join.slack.com/t/flows-sh/shared_invite/zt-2dkcznh40-gmX5TfKywRKA6iUGqbI~zg",
        permanent: false,
      },
    ];
  },
};

module.exports = withBundleAnalyzer(withContentlayer(nextConfig));
