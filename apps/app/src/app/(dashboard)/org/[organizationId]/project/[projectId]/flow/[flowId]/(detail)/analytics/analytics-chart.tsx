"use client";

import { css } from "@flows/styled-system/css";
import { Box } from "@flows/styled-system/jsx";
import type { LineChartItem } from "components/ui/line-chart";
import { LineChart } from "components/ui/line-chart";
import { monthDayYear } from "lib/date";
import { type ComponentProps, type FC, useCallback } from "react";
import { plural, t } from "translations";
import { Text } from "ui";

const formatByCategory = {
  starts: (value: number) =>
    `${value} ${plural(value, t.analytics.values.starts, t.analytics.values.starts_plural)}`,
  finishes: (value: number) =>
    `${value} ${plural(value, t.analytics.values.finishes, t.analytics.values.finishes_plural)}`,
  "finish-rate": (value: number) => `${Math.round(value * 100)}%`,
  exits: (value: number) =>
    `${value} ${plural(value, t.analytics.values.exits, t.analytics.values.exits_plural)}`,
  users: (value: number) =>
    `${value} ${plural(value, t.analytics.values.users, t.analytics.values.users_plural)}`,
};

type Props = {
  data: ComponentProps<typeof LineChart>["data"];
  categoryKey: keyof typeof formatByCategory;
};

export const AnalyticsChart: FC<Props> = ({ data, categoryKey }) => {
  const renderTooltip = useCallback(
    (item: LineChartItem) => (
      <Box cardWrap="-" px="space12" py="space8" shadow="l3">
        <Text className={css({ mb: "space4" })} color="muted">
          {monthDayYear(item.label)}
        </Text>
        <Text variant="titleM">{formatByCategory[categoryKey](item.value)}</Text>
      </Box>
    ),
    [categoryKey],
  );

  return <LineChart data={data} renderTooltip={renderTooltip} />;
};
