"use client";

import { css } from "@flows/styled-system/css";
import { Box, Flex, Grid } from "@flows/styled-system/jsx";
import { monthDay } from "lib/date";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { routes } from "routes";
import { Checkbox, Text } from "ui";

import type { EventCategory } from "./page";

type Props = {
  categories: EventCategory[];
  currentCategoryKey: string;
  organizationId: string;
  projectId: string;
  flowId: string;
};

const titleColumnWidth = 132;
const columnWidth = 88;
const boxCss = css({
  paddingY: "space8",
  paddingX: "space12",
});

export const AnalyticsTable: FC<Props> = ({
  categories,
  currentCategoryKey,
  flowId,
  organizationId,
  projectId,
}) => {
  const router = useRouter();

  return (
    <Grid
      borderBottomLeftRadius="0!"
      borderBottomRightRadius="0!"
      cardWrap="-"
      gap={0}
      gridTemplateColumns={`${titleColumnWidth}px 1fr`}
      overflow="auto"
    >
      <Flex backgroundColor="bg.muted" borRight="1px" direction="column" left={0} position="sticky">
        <Box borBottom="1px" className={boxCss} width={titleColumnWidth}>
          <Text color="muted" variant="bodyXs" weight="600">
            Event
          </Text>
        </Box>
        {categories.map((cat) => {
          return (
            <Flex borBottom="1px" borderColor="border.subtle!" key={cat.key}>
              <Box className={boxCss} width={titleColumnWidth}>
                <Checkbox
                  checked={currentCategoryKey === cat.key}
                  label={cat.title}
                  onCheckedChange={() =>
                    router.push(
                      routes.flowAnalytics({
                        flowId,
                        organizationId,
                        projectId,
                        category: cat.key,
                      }),
                    )
                  }
                />
              </Box>
            </Flex>
          );
        })}
      </Flex>
      <Flex direction="column">
        <Flex borBottom="1px">
          {categories[0].data.map((stat) => {
            return (
              <Box className={boxCss} key={stat.date} minWidth={columnWidth}>
                <Text align="right" color="muted" variant="bodyXs" weight="600">
                  {monthDay(stat.date)}
                </Text>
              </Box>
            );
          })}
        </Flex>
        {categories.map((cat) => {
          return (
            <Flex borBottom="1px" borderColor="border.subtle!" key={cat.key}>
              {cat.data.map((stat) => {
                if (stat.type === "finishRate") {
                  return (
                    <Box className={boxCss} key={stat.date} minWidth={columnWidth}>
                      <Text align="right">{(stat.count * 100).toFixed(2)}%</Text>
                    </Box>
                  );
                }
                return (
                  <Box className={boxCss} key={stat.date} minWidth={columnWidth}>
                    <Text align="right">{stat.count}</Text>
                  </Box>
                );
              })}
            </Flex>
          );
        })}
      </Flex>
    </Grid>
  );
};
