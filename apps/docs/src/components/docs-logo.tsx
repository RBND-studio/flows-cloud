import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import Link from "next/link";
import { Logo } from "ui";

export const DocsLogo = (): JSX.Element => {
  return (
    <Flex alignItems="center" gap="space12">
      <Link
        className={css({
          fastEaseInOut: "opacity",
          "&:hover": {
            opacity: 0.7,
          },
        })}
        href="https://flows.sh"
      >
        <Logo type="type" size={20} />
      </Link>
      <Box background="border.strong" height="20px" width="1px" />
      <Link
        className={css({
          color: "text.subtle!",
          fastEaseInOut: "color",
          "&:hover": {
            color: "text!",
          },
        })}
        href="/"
      >
        Docs
      </Link>
    </Flex>
  );
};
