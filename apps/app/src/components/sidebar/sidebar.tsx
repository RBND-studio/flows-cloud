"use client";

import { css, cx } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { Flows16, Hat16, Paintbrush16, Settings16 } from "icons";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { type FC, useMemo } from "react";
import { routes } from "routes";
import { Icon, Logo, Text } from "ui";

import { HelpMenu } from "./help-menu";
import { Invites } from "./invites";
import { ProjectsMenu } from "./projects-menu/projects-menu";
import { SettingsMenu } from "./settings-menu";
import { UsageWidget } from "./usage-widget";

const NavSectionCss = css({
  display: "flex",
  flexDirection: "column",
  paddingX: "space8",
});

const ProductHunt = () => {
  return (
    <a
      href="https://www.producthunt.com/posts/flows-5?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-flows&#0045;5"
      target="_blank"
      rel="noopener"
      className={css({
        marginX: "auto",
      })}
    >
      <Image
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=465680&theme=light"
        alt="Flows - User&#0032;onboarding&#0032;for&#0032;modern&#0032;SaaS | Product Hunt"
        className={css({
          width: "207px",
          height: "45px",
          opacity: 0,
          animation: "topSlideIn 0.6s ease-out",
          animationDelay: "0.8s",
          animationFillMode: "forwards",
        })}
        width="207"
        height="45"
        unoptimized
      />
    </a>
  );
};

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
        label: "Flows",
        href: routes.project({ organizationId, projectId }),
        icon: Flows16,
        active:
          pathname === routes.project({ organizationId, projectId }) ||
          pathname.startsWith(`${routes.project({ organizationId, projectId })}/flow`),
      },
      // {
      //   label: "Home",
      //   href: "/",
      //   icon: Home16,
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
  }, [organizationId, pathname, projectId]);

  return (
    <nav
      className={css({
        width: "240px",
        flexShrink: 0,
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
              <Logo type="type" size={20} />
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
              const active = item.active ?? item.href === pathname;
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
            <ProductHunt />
          </div>
          <div className={NavSectionCss}>
            <UsageWidget organizationId={organizationId} />
          </div>
        </Flex>
      </div>
    </nav>
  );
};
