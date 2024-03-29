import { type DocsThemeConfig } from "nextra-theme-docs";

import { BetterCallout } from "./components/better-callout";
import { Demo } from "./components/demo";
import { DocsBanner } from "./components/docs-banner";
import { DocsLogo } from "./components/docs-logo";
import { DocsSignUp } from "./components/docs-sign-up";
import { SectionLink } from "./components/section-link";
import { SEO_PROPS } from "./lib/constants";

const config: DocsThemeConfig = {
  logo: <DocsLogo />,
  logoLink: false, // Disabled because we have a custom logo with links

  banner: {
    text: <DocsBanner />,
    dismissible: false,
  },

  project: {
    link: "https://app.flows.sh",
    icon: <DocsSignUp />,
  },
  docsRepositoryBase: "https://github.com/RBND-studio/flows-cloud/tree/main/apps/docs",
  feedback: { content: null },

  head: null,
  useNextSeoProps() {
    return SEO_PROPS;
  },

  darkMode: true,
  primaryHue: 12,
  primarySaturation: 70,

  footer: {
    component: null,
  },

  components: {
    Demo,
    SectionLink,
    BetterCallout,
  },
};

export default config;
