import { cva, cx } from "@flows/styled-system/css";
import type { SystemStyleObject } from "@flows/styled-system/types";
import { Spinner20 } from "icons";
import { forwardRef } from "react";

import { Icon } from "../icon";

type Props = {
  className?: string;
  color?: SystemStyleObject["color"];
};

export const Spinner = forwardRef<HTMLDivElement, Props>(function Spinner(
  { className, color, ...props },
  ref,
) {
  return (
    <div {...props} className={cx(spinner(), className)} ref={ref}>
      <Icon color={color ?? "icon.primary"} icon={Spinner20} />
    </div>
  );
});

const spinner = cva({
  base: {
    animation: "rotate 1100ms infinite linear",
    width: 20,
    height: 20,
  },
});
