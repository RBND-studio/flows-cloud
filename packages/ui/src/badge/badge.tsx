import { cva, cx } from "@flows/styled-system/css";
import { Box } from "@flows/styled-system/jsx";
import { type FC, type ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
};

export const Badge: FC<Props> = (props) => {
  return <Box {...props} borderRadius="radius12" className={cx(badge({}), props.className)} />;
};

const badge = cva({
  base: {
    display: "inline-flex",
    borderRadius: "radius24",
    textStyle: "titleS",
    justifyContent: "center",
  },
  variants: {
    size: {
      default: {
        px: "6px",
        minWidth: "20px",
      },
    },
    color: {
      default: {
        bor: "1px",
        borderColor: "border.strong",
        background: "bg",
        textStyle: "bodyS",
        fontWeight: "600",
        color: "text.muted",
      },
    },
  },
  defaultVariants: {
    size: "default",
    color: "default",
  },
});
