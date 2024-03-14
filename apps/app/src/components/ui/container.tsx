import { css, cx } from "@flows/styled-system/css";
import type { FC, HTMLProps } from "react";

export const Container: FC<HTMLProps<HTMLDivElement>> = (props) => (
  <div
    className={cx(css({ maxWidth: "1100px", mx: "auto", py: "space24", px: "space32" }))}
    {...props}
  />
);
