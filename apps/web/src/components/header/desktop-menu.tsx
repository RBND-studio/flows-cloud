"use client";

import { css } from "@flows/styled-system/css";
import { SmartLink } from "components/ui";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";
import React from "react";
import { Text } from "ui";

import { menuItems } from "./menu-items";

export const DesktopMenu = (): ReactElement => {
  const pathName = usePathname();
  const path = `/${pathName.split("/").slice(1, 2)[0]}`;

  return (
    <ul
      className={css({
        sm: { display: "flex", gap: "space40" },
        mdDown: { gap: "space24" },
        display: "none",
      })}
    >
      {menuItems.map((item) => (
        <li key={item.title}>
          <Text
            asChild
            className={css({
              fastEaseInOut: "color",
              "&:hover": {
                color: "text",
              },
            })}
            color={path === item.href ? "default" : "subtle"}
            variant="titleS"
          >
            <SmartLink href={item.href} target={item.target}>
              {item.title}
            </SmartLink>
          </Text>
        </li>
      ))}
    </ul>
  );
};
