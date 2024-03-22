import { cva } from "@flows/styled-system/css";
import { Box } from "@flows/styled-system/jsx";
import { Alert16, CircleSlash16, Info16 } from "icons";
import type { FC, ReactNode } from "react";
import { Icon } from "ui";

type Props = {
  variant?: "info" | "warning" | "danger";
  children?: ReactNode;
};

const calloutWrapper = cva({
  base: {
    padding: "space16",
    bor: "1px!",
    borderRadius: "radius12",
    marginY: "space24",
    color: "text.muted!",
    display: "flex",
    gap: "space8",
    backgroundColor: "bg.muted",
  },
  variants: {
    variant: {
      info: {},
      warning: {
        backgroundColor: "bg.warningSubtle",
        color: "text.warning",
        borderColor: "border.warningSubtle!",
      },
      danger: {
        backgroundColor: "bg.dangerSubtle",
        color: "text.danger",
        borderColor: "border.dangerSubtle!",
      },
    },
  },
});

const IconVariant = ({ variant }: { variant: Props["variant"] }): JSX.Element => {
  switch (variant) {
    case "info":
      return <Icon icon={Info16} />;
    case "warning":
      return <Icon color="icon.warning" icon={Alert16} />;
    case "danger":
      return <Icon color="icon.danger" icon={CircleSlash16} />;
    default:
      return <Icon icon={Info16} />;
  }
};

export const BetterCallout: FC<Props> = ({ children, variant = "info" }) => {
  return (
    <Box className={calloutWrapper({ variant })}>
      <Box mt="6px">
        <IconVariant variant={variant} />
      </Box>
      <span>{children}</span>
    </Box>
  );
};
