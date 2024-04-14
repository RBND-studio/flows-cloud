import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { SmartLink } from "components/ui";
import Image from "next/image";
import type { ReactElement } from "react";
import React from "react";
import { routes } from "routes";
import { links } from "shared";
import { Text } from "ui";

import { ThemeSwitch } from "./theme-switch";

interface FooterGroup {
  title: string;
  links: {
    title: string;
    href: string;
    target?: string;
  }[];
}

const footerGroups: FooterGroup[] = [
  {
    title: "Product",
    links: [
      {
        title: "Features",
        href: routes.features,
      },
      {
        title: "Demo",
        href: links.nextJsDemo,
        target: "_blank",
      },
      {
        title: "Pricing",
        href: routes.pricing,
      },
      {
        title: "Changelog",
        href: routes.changelog,
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        title: "Blog",
        href: routes.blog,
      },
      {
        title: "Docs",
        href: links.docs,
      },
      {
        title: "Github",
        href: links.rbndGithub,
        target: "_blank",
      },
      {
        title: "Status",
        href: links.status,
        target: "_blank",
      },
    ],
  },
  {
    title: "Other",
    links: [
      { title: "About", href: routes.about },
      { title: "Privacy", href: routes.privacy },
      { title: "Terms", href: routes.terms },
    ],
  },
];

export const Footer = (): ReactElement => {
  return (
    <footer
      className={css({
        backgroundColor: "bg.muted",
        paddingX: "space24",
      })}
    >
      <Flex
        flexDirection="column-reverse"
        gap="space40"
        alignItems="flex-start"
        maxWidth="960px"
        mx="auto"
        py="space40"
        sm={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box display="inline-flex" alignItems="center" gap="space8" marginBottom="space24">
            <Image alt="Logo" height={24} src="/images/logo/logo.svg" width={24} />
            <Text variant="bodyM" weight="700">
              Flows
            </Text>
          </Box>
          <Box marginBottom="space16">
            <Text color="subtle" variant="bodyS">
              Follow us
            </Text>
            <Flex gap="space16" alignItems="center">
              <Text asChild variant="bodyS" weight="700">
                <a
                  href={links.twitter}
                  rel="noopener"
                  target="_blank"
                  className={css({ _hover: { textDecoration: "underline" } })}
                >
                  Twitter
                </a>
              </Text>
              <Text asChild variant="bodyS" weight="700">
                <a
                  href={links.rbndGithub}
                  rel="noopener"
                  target="_blank"
                  className={css({ _hover: { textDecoration: "underline" } })}
                >
                  Github
                </a>
              </Text>
            </Flex>
          </Box>
          <Text color="subtle" variant="bodyS">
            © 2024{" "}
            <a
              target="_blank"
              href={links.rbnd}
              rel="noopener"
              className={css({ fontWeight: "700", _hover: { textDecoration: "underline" } })}
            >
              RBND studio
            </a>
          </Text>
        </Box>
        <Flex
          flexDirection="row"
          flexWrap="wrap"
          alignItems="flex-start"
          width="100%"
          gap="0"
          rowGap="space48"
          sm={{
            gap: "space48",
            width: "auto",
            flexDirection: "row",
          }}
        >
          {footerGroups.map((group) => (
            <Flex
              flexDirection="column"
              alignItems="flex-start"
              key={group.title}
              width="50%"
              sm={{
                width: "auto",
              }}
            >
              <Text className={css({ mb: "space4" })} color="subtle" variant="bodyS">
                {group.title}
              </Text>
              {group.links.map((link) => (
                <Text
                  asChild
                  className={css({
                    padding: "space8 ",
                    mx: "-space8 ",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                    sm: {
                      padding: "space4",
                      mx: "-space4",
                    },
                  })}
                  key={link.href}
                  variant="bodyS"
                  weight="700"
                >
                  <SmartLink href={link.href} target={link.target}>
                    {link.title}
                  </SmartLink>
                </Text>
              ))}
            </Flex>
          ))}
          <ThemeSwitch />
        </Flex>
      </Flex>
    </footer>
  );
};
