import { css } from "@flows/styled-system/css";
import { SmartLink } from "components/ui";
import Image from "next/image";
import type { ReactElement } from "react";
import React from "react";
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
        href: "/features",
      },
      {
        title: "Demo",
        href: links.nextJsDemo,
        target: "_blank",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        title: "Blog",
        href: "/blog",
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
      {
        title: "Privacy",
        href: "/privacy",
      },
      {
        title: "Terms",
        href: "/terms",
      },
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
      <div
        className={css({
          maxWidth: "960px",
          mx: "auto",
          py: "space40",
          display: "flex",
          flexDirection: "column",
          gap: "space40",
          flexDir: "column-reverse",
          alignItems: "flex-start",
          sm: {
            flexDirection: "row",
            justifyContent: "space-between",
          },
        })}
      >
        <div>
          <div
            className={css({
              display: "inline-flex",
              alignItems: "center",
              gap: "space8",
              marginBottom: "space24",
            })}
          >
            <Image alt="Logo" height={24} src="/images/logo/logo.svg" width={24} />
            <Text variant="bodyM" weight="700">
              Flows
            </Text>
          </div>
          <div
            className={css({
              marginBottom: "space16",
            })}
          >
            <Text color="subtle" variant="bodyS">
              Follow us
            </Text>
            <div
              className={css({
                display: "flex",
                alignItems: "center",
                gap: "space16",
              })}
            >
              <Text asChild variant="bodyS" weight="700">
                <a href={links.twitter} rel="noopener" target="_blank">
                  Twitter
                </a>
              </Text>
              <Text asChild variant="bodyS" weight="700">
                <a href={links.rbndGithub} rel="noopener" target="_blank">
                  Github
                </a>
              </Text>
            </div>
          </div>
          <Text color="subtle" variant="bodyS">
            © 2024 RBND studios
          </Text>
        </div>
        <div
          className={css({
            display: "flex",
            gap: "space48",
            flexDirection: "column",
            alignItems: "flex-start",
            sm: {
              flexDirection: "row",
            },
          })}
        >
          {footerGroups.map((group) => (
            <div
              className={css({
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              })}
              key={group.title}
            >
              <Text className={css({ mb: "space4" })} color="subtle" variant="bodyS">
                {group.title}
              </Text>
              {group.links.map((link) => (
                <Text
                  asChild
                  className={css({
                    padding: "space4",
                    mx: "-space4",
                    "&:hover": {
                      textDecoration: "underline",
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
            </div>
          ))}
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  );
};
