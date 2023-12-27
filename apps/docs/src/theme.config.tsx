import { css } from "@flows/styled-system/css";
import Image from "next/image";
import { type DocsThemeConfig } from "nextra-theme-docs";
import { Text } from "ui";

const config: DocsThemeConfig = {
  sidebar: {
    toggleButton: true,
  },

  logo: (
    <span className={css({ display: "flex", gap: "space8", alignItems: "center" })}>
      <Image alt="Logo" height={28} src="/docs/logo.svg" width={28} />
      <Text className={css({ color: "inherit" })} variant="bodyM" weight="700">
        Flows
      </Text>
    </span>
  ),
  project: {
    link: "https://github.com/RBND-studio",
  },
  docsRepositoryBase: "https://github.com/RBND-studio/flows-cloud/tree/main/apps/docs",
  feedback: { content: null },
  footer: {
    text: "Flows",
  },
  darkMode: true,
  head: null,
  useNextSeoProps() {
    return {
      titleTemplate: "%s | Flows docs",
      defaultTitle: "Flows docs",
      openGraph: {
        type: "website",
        title: "Flows: Onboarding for modern SaaS",
        description:
          "Flows is a better way to onboard users and drive product adoption. With advanced flow steps and modern architecture, Flows is the tool for modern SaaS companies.",
        images: [{ url: "https://flows.sh/og.png" }],
        url: "https://flows.sh",
        locale: "en_US",
      },
      twitter: {
        cardType: "summary_large_image",
        handle: "@flows_sh",
      },
      description:
        "Flows is a better way to onboard users and drive product adoption. With advanced flow steps and modern architecture, Flows is the tool for modern SaaS companies.",
      keywords: ["flows", "onboarding", "product adoption", "user onboarding", "user adoption"],
    };
  },
  primaryHue: 12,
  primarySaturation: 80,
};

export default config;
