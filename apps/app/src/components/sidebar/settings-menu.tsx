"use client";

import { css } from "@flows/styled-system/css";
import { useAuth } from "auth/client";
import { Check16, Settings24 } from "icons";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import type { FC } from "react";
import { routes } from "routes";
import { t } from "translations";
import { Button, Icon, Popover, PopoverContent, PopoverTrigger, Text } from "ui";

import { MenuItem } from "./menu-item";
import { MenuSection } from "./menu-section";
import { ThemeSwitch } from "./theme-switch";

export const SettingsMenu: FC = () => {
  const { projectId, organizationId } = useParams<{ projectId?: string; organizationId: string }>();
  const pathname = usePathname();
  const { auth, logout, processingLogout } = useAuth();

  const SETTINGS_MENU_OPTIONS = [
    ...(auth?.user.id
      ? [
          {
            label: "Personal settings",
            href: routes.userSettings(),
          },
        ]
      : []),
    ...(projectId
      ? [
          {
            label: "Project settings",
            href: routes.projectSettings({ organizationId, projectId }),
          },
        ]
      : [
          {
            label: "Project settings",
          },
        ]),
    ...(organizationId
      ? [
          {
            label: "Organization settings",
            href: routes.organizationSettings({ organizationId }),
          },
        ]
      : [
          {
            label: "Organization settings",
          },
        ]),
  ];

  const trigger = (
    <Button size="icon" variant="secondary">
      <Icon icon={Settings24} className={css({ w: "20px", h: "20px" })} />
    </Button>
  );

  if (!auth) return trigger;

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align="end">
        <div
          className={css({
            minWidth: "280px",
          })}
        >
          <MenuSection background="bg.muted" bottomBorder header>
            {auth.user.full_name ? <Text variant="titleS">{auth.user.full_name}</Text> : null}
            <Text color="muted" variant="bodyS">
              {auth.user.email}
            </Text>
          </MenuSection>
          <MenuSection bottomBorder>
            {SETTINGS_MENU_OPTIONS.map((option) => {
              if (!option.href)
                return (
                  <MenuItem asChild disabled key={option.label}>
                    <Text as="span" color="disabled" variant="bodyS">
                      {option.label}
                    </Text>
                  </MenuItem>
                );
              const active = pathname === option.href;
              return (
                <MenuItem
                  asChild
                  className={css({ justifyContent: "space-between" })}
                  key={option.label}
                >
                  <Link href={option.href}>
                    <Text as="span" variant="bodyS">
                      {option.label}
                    </Text>
                    {active ? <Icon color="icon.primary" icon={Check16} /> : null}
                  </Link>
                </MenuItem>
              );
            })}
          </MenuSection>
          <MenuSection bottomBorder>
            <div
              className={css({
                display: "flex",
                gap: "space48",
                p: "space8",
                alignItems: "center",
              })}
            >
              <Text variant="bodyS">{t.settings.theme}</Text>
              <ThemeSwitch />
            </div>
          </MenuSection>

          <MenuSection background="bg.muted">
            <MenuItem asChild>
              <button disabled={processingLogout} onClick={logout} type="submit">
                <Text as="span" variant="bodyS">
                  {t.actions.logout}
                </Text>
              </button>
            </MenuItem>
          </MenuSection>
        </div>
      </PopoverContent>
    </Popover>
  );
};
