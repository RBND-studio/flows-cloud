import { css, cva, cx } from "@flows/styled-system/css";
import type { SystemStyleObject } from "@flows/styled-system/types";
import { Spinner20 } from "icons";
import { forwardRef } from "react";

import { Icon } from "../icon";

type Props = {
  className?: string;
  color?: SystemStyleObject["color"];
  size?: number;
};

export const Spinner = forwardRef<HTMLDivElement, Props>(function Spinner(
  { className, color, size, ...props },
  ref,
) {
  return (
    <div {...props} className={cx(spinner(), className)} ref={ref}>
      <Icon
        className={css({ w: size, h: size })}
        color={color ?? "icon.primary"}
        icon={Spinner20}
      />
    </div>
  );
});

const spinner = cva({
  base: {
    animation: "rotate 1100ms infinite linear",
  },
});
