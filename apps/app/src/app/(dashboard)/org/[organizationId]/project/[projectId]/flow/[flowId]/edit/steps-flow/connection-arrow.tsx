import { token } from "@flows/styled-system/tokens";
import { Group } from "@visx/group";
import { scalePoint } from "@visx/scale";
import { LinkVertical } from "@visx/shape";
import { type FC, useMemo } from "react";

import { boxConstants } from "./steps-flow.constants";

type Props = {
  lines: number;
  variant: "fork" | "merge";
};

export const ConnectionArrow: FC<Props> = ({ lines, variant }) => {
  const height = 72;
  const width =
    (lines - 1) * (parseInt(boxConstants.width as string) + parseInt(boxConstants.gap as string));
  const sidePadding = 4;

  const items = useMemo(
    () =>
      Array(lines)
        .fill(null)
        .map((_, i) => i),
    [lines],
  );
  const scaleX = useMemo(
    () =>
      scalePoint({
        domain: items,
        range: [0, width],
      }),
    [items, width],
  );

  if (!lines) return null;

  return (
    <svg height={height} width={width + sidePadding * 2}>
      <Group left={sidePadding}>
        {items.map((i) => {
          const source = { x: width / 2, y: variant === "fork" ? 0 : height };
          const target = { x: scaleX(i), y: variant === "fork" ? height : 0 };
          return (
            <LinkVertical
              data={{ source, target }}
              end={variant === "fork" ? "arrowStart" : "arrowEnd"}
              fill="none"
              key={i}
              stroke={token("colors.border")}
              strokeWidth={2}
            />
          );
        })}
      </Group>
    </svg>
  );
};
