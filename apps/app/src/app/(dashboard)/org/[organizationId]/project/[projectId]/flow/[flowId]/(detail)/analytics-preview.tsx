import { Box, Flex, Wrap } from "@flows/styled-system/jsx";
import type { FlowDetail } from "lib/api";
import type { FC } from "react";
import { t } from "translations";
import { Text } from "ui";

type Props = {
  flow: FlowDetail;
};

export const AnalyticsPreview: FC<Props> = ({ flow }) => {
  const starts = flow.preview_stats.find((s) => s.type === "startFlow")?.count ?? 0;
  const finishes = flow.preview_stats.find((s) => s.type === "finishFlow")?.count ?? 0;

  const items = [
    {
      title: t.analytics.starts,
      value: starts,
    },
    {
      title: t.analytics.finishes,
      value: finishes,
    },
    {
      title: t.analytics.finishRate,
      value: starts ? `${Math.round((finishes / starts) * 100)}%` : "-",
    },
    {
      title: t.analytics.exits,
      value: flow.preview_stats.find((s) => s.type === "cancelFlow")?.count ?? 0,
    },
    {
      title: t.analytics.users,
      value: flow.preview_stats.find((s) => s.type === "uniqueUsers")?.count ?? 0,
    },
  ];

  return (
    <Box cardWrap="-" width="100%">
      <Box borBottom="1px" paddingX="space16" paddingY="space12">
        <Text>Statistics for the last 30 days</Text>
      </Box>
      <Wrap>
        {items.map((item) => (
          <Flex
            _last={{
              borderRight: "none",
            }}
            borRight="1px"
            flex="1"
            flexDirection="column"
            gap="space4"
            key={item.title}
            padding="space16"
            paddingY="space12"
          >
            <Text color="subtle" variant="bodyXs">
              {item.title}
            </Text>
            <Text variant="titleM">{item.value}</Text>
          </Flex>
        ))}
      </Wrap>
    </Box>
  );
};
