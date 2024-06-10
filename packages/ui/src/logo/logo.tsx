import { css, cx } from "@flows/styled-system/css";
import { type FC } from "react";

import { LogoMarkSvg } from "./logo-mark";
import { LogoPillSvg } from "./logo-pill";
import { LogoTypeSvg } from "./logo-type";

const logoByType = {
  mark: LogoMarkSvg,
  type: LogoTypeSvg,
  pill: LogoPillSvg,
} as const;

type Props = {
  type: keyof typeof logoByType;
  color?: string;
  size?: number;
  className?: string;
};

export const Logo: FC<Props> = ({ type, color = "currentColor", size = 40, className }) => {
  const LogoComponent = logoByType[type];

  return (
    <LogoComponent
      className={cx(
        css({
          color,
        }),
        className,
      )}
      height={size}
    />
  );
};
