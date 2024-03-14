import { token } from "@flows/styled-system/tokens";
import { Group } from "@visx/group";
import { scalePoint } from "@visx/scale";
import { LinkVertical } from "@visx/shape";
import type { FC } from "react";

import { boxGap, boxWidth } from "./steps-flow.constants";

type Props = {
  lines: number;
  variant: "fork" | "merge";
};

export const ConnectionArrow: FC<Props> = ({ lines, variant }) => {
  const height = 100;
  const width = (lines - 1) * (boxWidth + boxGap);
  const sidePadding = 4;
  const items = Array(lines)
    .fill(null)
    .map((_, i) => i);

  const scaleX = scalePoint({
    domain: items,
    range: [0, width],
  });

  return (
    <svg height={height} width={width + sidePadding * 2}>
      <Group left={sidePadding}>
        {items.map((i) => {
          const source = { x: width / 2, y: variant === "fork" ? 0 : height };
          const target = { x: scaleX(i), y: variant === "fork" ? height : 0 };
          return (
            <LinkVertical
              data={{ source, target }}
              fill="none"
              key={i}
              stroke={token("colors.border")}
            />
          );
        })}
      </Group>
    </svg>
  );
};
