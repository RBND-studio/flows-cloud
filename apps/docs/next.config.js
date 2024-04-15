const path = require("node:path");

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./src/theme.config.tsx",
  defaultShowCopyCode: true,
  staticImage: true,
});

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
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
  swcMinify: true,
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
    optimizePackageImports: ["ui", "icons", "shared"],
  },
  basePath: "/docs",
  i18n: {
    defaultLocale: "en-US",
    locales: ["en-US"],
  },
  images: {
    formats: ["image/webp"],
  },
};

module.exports = withNextra(nextConfig);
