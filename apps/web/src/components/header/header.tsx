import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { MobileMenu } from "components/header/mobile-menu";
import { SignupClick } from "components/utils/signup-click";
import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { links } from "shared";
import { Button, Text } from "ui";

import { DesktopMenu } from "./desktop-menu";

export const Header = (): ReactElement => {
  return (
    <header
      className={css({
        backgroundColor: "bg",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "border",
        paddingX: "space16",
        position: "sticky",
        top: 0,
        zIndex: 10,
      })}
    >
      <div
        className={css({
          mx: "auto",
          py: "space12",
          display: "flex",
          alignItems: "center",
          maxWidth: "960px",
          gap: "space8",
        })}
      >
        <Flex flex={1} gap="space8" maxW="150px">
          <Link
            className={css({
              display: "inline-flex",
              alignItems: "center",
              gap: "space8",
            })}
            href="/"
          >
            <Image alt="Logo" height={28} priority src="/images/logo/logo.svg" width={28} />
            <Text variant="bodyM" weight="700">
              Flows
            </Text>
          </Link>
        </Flex>
        <Flex flex={1} justifyContent="center">
          <DesktopMenu />
        </Flex>
        <Flex flex={1} gap="space8" justifyContent="flex-end" maxW="150px">
          <Button asChild variant="ghost">
            <a href={links.logIn}>Log in</a>
          </Button>
          <SignupClick>
            <Button asChild variant="black">
              <a href={links.signUp}>Sign up</a>
            </Button>
          </SignupClick>
        </Flex>
        <MobileMenu />
      </div>
    </header>
  );
};
