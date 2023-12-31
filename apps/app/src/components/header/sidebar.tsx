"use client";

import { css, cx } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { SettingsMenu } from "components/header/settings-menu";
import { Flows16, Graph16, Home16, Settings16 } from "icons";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
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

  const HEADER_ITEMS = useMemo(() => {
    if (!projectId) return [];
    return [
      {
        label: "Home",
        href: routes.project({ organizationId, projectId }),
        icon: Home16,
      },
      {
        label: "Flows",
        // TODO: add flows route
        href: "/",
        icon: Flows16,
      },
      {
        label: "Analytics",
        // TODO: add analytics route
        href: "/",
        icon: Graph16,
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
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        borderBottomWidth: "1px",
        borderStyle: "solid",
        borderColor: "border",
        width: "240px",
        minWidth: "240px",
        borRight: "1px",
        backgroundColor: "bg",
        paddingY: "space16",
        position: "sticky",
        top: 0,
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
          {HEADER_ITEMS.map((item) => (
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

                    transitionDuration: "fast",
                    transitionTimingFunction: "easeInOut",
                    transitionProperty: "background-color",

                    "&:hover": {
                      bg: "bg.hover",
                    },
                  })}
                >
                  <Icon color="text.muted" icon={item.icon} />
                  <Text color="muted" variant="bodyS" weight="600">
                    {item.label}
                  </Text>
                </span>
              </Link>
            </li>
          ))}
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

              backgroundColor: "bg.muted",
              bor: "1px",
              borderRadius: "radius8",

              paddingY: "space8",
              paddingX: "space8",

              marginX: "space8",

              justifyContent: "space-between",
              alignItems: "center",
            })}
          >
            <Text weight="600">Free plan</Text>
            <Text variant="bodyXs">600 / 1000 TODO</Text>
          </div>
        </div>
      </Flex>
    </nav>
  );
};
