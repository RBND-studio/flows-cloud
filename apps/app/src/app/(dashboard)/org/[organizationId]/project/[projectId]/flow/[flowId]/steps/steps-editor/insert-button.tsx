import { css, cx } from "@flows/styled-system/css";
import { Box } from "@flows/styled-system/jsx";
import type { FC, ReactNode } from "react";
import { Text } from "ui";

type Props = {
  onClick: () => void;
  className?: string;
  children?: ReactNode;
};

export const InsertButton: FC<Props> = ({ onClick, className, children }) => {
  return (
    <button
      className={cx(
        css({
          display: "flex",
          width: "100%",
          _hover: { opacity: 1 },
          alignItems: "center",
          fastEaseInOut: "all",
          gap: "space12",
          opacity: 0,
          cursor: "pointer",
        }),
        className,
      )}
      onClick={onClick}
      type="button"
    >
      <Box borBottom="1px" flex={1} />
      <Text color="muted" variant="bodyXs">
        {children}
      </Text>
      <Box borBottom="1px" flex={1} />
    </button>
  );
};
