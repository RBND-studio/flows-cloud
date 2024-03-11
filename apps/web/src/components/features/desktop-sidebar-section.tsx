"use client";

import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC, ReactElement } from "react";

type Props = {
  title: string;
  link: string;
  items?: ReactElement[];
};

export const DesktopSidebarSection: FC<Props> = ({ link, title, items }) => {
  const pathname = usePathname();
  const active = pathname.startsWith(link);

  return (
    <>
      <Link
        className={css({
          mb: "space16",
          textStyle: "titleM",
          color: active ? "text" : "text.subtle",
          fastEaseInOut: "color",
          _hover: { color: "text.primary" },
        })}
        color={pathname.startsWith(link) ? "primary" : undefined}
        href={link}
      >
        {title}
      </Link>
      <Flex flexDirection="column" gap="space8" mb="space24" srOnly={!active}>
        {items}
      </Flex>
    </>
  );
};
