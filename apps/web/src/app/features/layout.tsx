import { type Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://flows.sh"),
  title: "Features – Flows",
  description:
    "The new standard for building user onboarding. Flows is the tool of choice for modern SaaS companies.",
  openGraph: {
    type: "website",
    title: "Features – Flows",
    description:
      "The new standard for building user onboarding. Flows is the tool of choice for modern SaaS companies.",
    images: [
      {
        url: "/images/features/features-og.png",
        width: 1200,
        height: 628,
        alt: "Features – Flows",
      },
    ],
    url: "/features",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Features – Flows",
    description:
      "The new standard for building user onboarding. Flows is the tool of choice for modern SaaS companies.",
    images: "/images/features/features-og.png",
    creator: "@flows_sh",
  },
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return children;
}
