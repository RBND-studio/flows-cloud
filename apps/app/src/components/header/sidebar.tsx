"use client";

import { css, cx } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { SettingsMenu } from "components/header/settings-menu";
import { Hat16, Home16, Paintbrush16, Settings16 } from "icons";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { type FC, useMemo } from "react";
import { routes } from "routes";
import { Icon, Text } from "ui";

import { HelpMenu } from "./help-menu";
import { Invites } from "./invites";
import { ProjectsMenu } from "./projects-menu";

const NavSectionCss = css({
  display: "flex",
  flexDirection: "column",
  paddingX: "space8",
});

export const Sidebar: FC = () => {
  const { projectId, organizationId } = useParams<{ projectId?: string; organizationId: string }>();
  const pathname = usePathname();

  const HEADER_ITEMS = useMemo(() => {
    if (!projectId) return [];
    return [
      {
        label: "Getting started",
        href: routes.projectGettingStarted({ organizationId, projectId }),
        icon: Hat16,
      },
      {
        label: "Home",
        href: routes.project({ organizationId, projectId }),
        icon: Home16,
      },
      // {
      //   label: "Flows",
      //   href: "/",
      //   icon: Flows16,
      // },
      // {
      //   label: "Analytics",
      //   href: "/",
      //   icon: Graph16,
      // },
      {
        label: "Style template",
        href: routes.projectTemplate({ organizationId, projectId }),
        icon: Paintbrush16,
      },
      {
        label: "Project settings",
        href: routes.projectSettings({ organizationId, projectId }),
        icon: Settings16,
      },
    ];
  }, [organizationId, projectId]);

  return (
    <nav
      className={css({
        width: "240px",
      })}
    >
      <div
        className={css({
          position: "fixed",
          top: 0,
          width: "240px",

          display: "flex",
          flexDirection: "column",
          height: "100vh",
          borRight: "1px",
          backgroundColor: "bg",
          paddingY: "space16",
        })}
      >
        <div className={NavSectionCss}>
          <Flex justifyContent="space-between" mb="space12" mx="space8">
            <Link
              className={css({
                display: "inline-flex",
                alignItems: "center",
                gap: "space8",
              })}
              href={routes.home}
            >
              <Image alt="Logo" height={32} priority src="/logo.svg" width={32} />
              <Text variant="titleM">Flows</Text>
            </Link>
            <Flex gap="space8">
              <HelpMenu />
              <SettingsMenu />
            </Flex>
          </Flex>
          <ProjectsMenu />
        </div>

        <div
          className={cx(
            NavSectionCss,
            css({
              height: "100%",
            }),
          )}
        >
          <ul
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: "space4",
              mt: "space16",
            })}
          >
            {HEADER_ITEMS.map((item) => {
              const active = item.href === pathname;
              return (
                <li key={item.label}>
                  <Link href={item.href}>
                    <span
                      className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "space8",

                        paddingY: "space8",
                        paddingX: "space8",
                        width: "100%",

                        borderRadius: "radius8",

                        fastEaseInOut: "background-color",

                        color: "text.muted",

                        "&:hover": {
                          bg: "bg.hover",
                        },

                        "&&[data-active=true]": {
                          color: "text.primary",
                          bg: "bg.subtle",
                        },
                      })}
                      data-active={active}
                    >
                      <Icon color="inherit" icon={item.icon} />
                      <Text color="inherit" variant="bodyS" weight="600">
                        {item.label}
                      </Text>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <Flex direction="column" gap="space12">
          <div className={NavSectionCss}>
            <Invites />
          </div>
          <div className={NavSectionCss}>
            <div
              className={css({
                display: "flex",
                flexDirection: "column",
                gap: "2px",

                backgroundColor: "bg.muted",
                bor: "1px",
                borderRadius: "radius8",

                paddingY: "space8",
                paddingX: "space8",

                marginX: "space8",
              })}
            >
              <Text variant="bodyXs" weight="600">
                Enjoy flows for free in the beta!
              </Text>
              <Text color="muted" variant="bodyXs">
                Pricing will be announced by the end of Q1 2024.
              </Text>
            </div>
          </div>
        </Flex>
      </div>
    </nav>
  );
};
