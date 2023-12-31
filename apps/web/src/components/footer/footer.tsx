import { css } from "@flows/styled-system/css";
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

//TODO: add Link component that handles internal and external links

const footerGroups: FooterGroup[] = [
  {
    title: "Product",
    links: [
      {
        title: "Overview",
        href: "/",
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
          maxWidth: "1100px",
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
            © 2023 RBND studios
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
                gap: "space8",
              })}
              key={group.title}
            >
              <Text color="subtle" variant="bodyS">
                {group.title}
              </Text>
              {group.links.map((link) => (
                <Text asChild key={link.href} variant="bodyS" weight="700">
                  <a
                    className={css({
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    })}
                    href={link.href}
                    {...(link.target ? { target: link.target, rel: "noopener" } : {})}
                  >
                    {link.title}
                  </a>
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
