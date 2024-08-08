"use client";

import { css } from "@flows/styled-system/css";
import { Box } from "@flows/styled-system/jsx";
import { SmartLink } from "components/ui";
import { Menu16 } from "icons";
import { usePathname } from "next/navigation";
import { type FC, useState } from "react";
import { IconButton, Text } from "ui";

import { menuItems } from "./menu-items";

export const MobileMenu: FC = () => {
  const pathName = usePathname();
  const path = `/${pathName.split("/").slice(1, 2)[0]}`;
  const [open, setOpen] = useState(false);
  const toggleOpen = (): void => setOpen((p) => !p);
  const handleClose = (): void => setOpen(false);

  return (
    <>
      {/* eslint-disable-next-line no-restricted-syntax -- hamburger menu */}
      <IconButton
        className={css({ sm: { display: "none" }, px: "8px" })}
        onClick={toggleOpen}
        variant="ghost"
      >
        <Menu16 />
        <span className={css({ srOnly: true })}>Open main menu</span>
      </IconButton>
      <Box
        backgroundColor="bg"
        borBottom="1px"
        display={open ? undefined : "none"}
        left={0}
        pb="space12"
        position="fixed"
        pt="space4"
        px="space16"
        sm={{ display: "none" }}
        top="56px"
        width="100%"
      >
        <ul className={css({ display: "flex", flexDir: "column" })}>
          {menuItems.map((item) => (
            <li key={item.title}>
              <Text
                asChild
                className={css({
                  display: "block",
                  px: "space8",
                  mx: "-space8",
                  py: "space8",
                  fastEaseInOut: "color",
                  "&:hover": {
                    color: "text",
                  },
                })}
                color={path === item.href ? "default" : "subtle"}
                onClick={handleClose}
                variant="titleM"
              >
                <SmartLink href={item.href} target={item.target}>
                  {item.title}
                </SmartLink>
              </Text>
            </li>
          ))}
        </ul>
      </Box>
    </>
  );
};
