import { css } from "@flows/styled-system/css";
import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  bottomBorder?: boolean;
  background?: string;
  header?: boolean;
};

export const MenuSection: FC<Props> = ({ children, bottomBorder, background, header }) => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: background || "bg",

        ...(header
          ? {
              paddingX: "space16",
              paddingY: "space12",
            }
          : {
              paddingX: "space8",
              paddingY: "space8",
            }),

        ...(bottomBorder
          ? {
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
              borderBottomColor: "border",
            }
          : {}),
      })}
    >
      {children}
    </div>
  );
};
