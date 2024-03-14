import "./globals.css";

import { css } from "@flows/styled-system/css";
import { CtaBanner } from "components/cta-banner";
import { Providers } from "components/providers";
import { PRODUCTION } from "lib";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";

import { Footer, Header } from "../components";

const MonaSans = localFont({
  src: "../fonts/Mona-Sans.woff2",
  display: "swap",
  variable: "--font-mona-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flows.sh"),
  title: "Flows – User onboarding for modern SaaS",
  description:
    "Flows lets you build any onboarding you want. Guide users, increase feature adoption, and improve revenue.",
  openGraph: {
    type: "website",
    title: "Flows: Onboarding for modern SaaS",
    description:
      "Flows lets you build any onboarding you want. Guide users, increase feature adoption, and improve revenue.",
    images: "/og.png",
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flows: Onboarding for modern SaaS",
    description:
      "Flows lets you build any onboarding you want. Guide users, increase feature adoption, and improve revenue.",
    images: "/og.png",
    creator: "@flows_sh",
  },
  keywords: ["flows", "onboarding", "product adoption", "user onboarding", "user adoption"],
  robots: PRODUCTION ? undefined : "noindex,nofollow",
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html className={MonaSans.variable} lang="en" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts -- needed for noflash script */}
        <script src="/noflash.min.js" />
      </head>
      <body className={css({ background: "bg" })}>
        <Providers>
          <Header />
          <main>
            {children}
            <CtaBanner />
          </main>
          <Footer />
        </Providers>
      </body>
      {PRODUCTION ? (
        <Script data-api="/box/event" data-domain="flows.sh" defer src="/box/script.js" />
      ) : null}
    </html>
  );
}
