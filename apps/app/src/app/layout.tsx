import "./globals.css";

import { css } from "@flows/styled-system/css";
import { Providers } from "components/providers";
import { PRODUCTION } from "lib/constants";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://app.flows.sh"),
  title: "Flows",
  description:
    "Flows is a better way to onboard users and drive product adoption. With advanced flow steps and modern architecture, Flows is the tool for modern SaaS companies.",
  openGraph: {
    type: "website",
    title: "Flows: Onboarding for modern SaaS",
    description:
      "Flows is a better way to onboard users and drive product adoption. With advanced flow steps and modern architecture, Flows is the tool for modern SaaS companies.",
    images: "https://flows.sh/og.png",
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flows: Onboarding for modern SaaS",
    description:
      "Flows is a better way to onboard users and drive product adoption. With advanced flow steps and modern architecture, Flows is the tool for modern SaaS companies.",
    images: "https://flows.sh/og.png",
    creator: "@flows_sh",
  },
  keywords: ["flows", "onboarding", "product adoption", "user onboarding", "user adoption"],
  robots: PRODUCTION ? undefined : "noindex,nofollow",
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html
      className={css({
        minHeight: "100%",
      })}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts -- needed for noflash script */}
        <script src="/noflash.min.js" />
      </head>
      <body
        className={css({
          background: "bg.main",
          minHeight: "100%",
        })}
      >
        <Providers>{children}</Providers>
      </body>
      {PRODUCTION ? (
        <Script
          data-api="https://flows.sh/box/event"
          data-domain="app.flows.sh"
          defer
          src="https://flows.sh/box/script.js"
        />
      ) : null}
    </html>
  );
}
