import { Box } from "@flows/styled-system/jsx";
import { api } from "lib/api";
import { load } from "lib/load";
import { t } from "translations";

import { AnalyticsChart } from "./analytics-chart";
import { AnalyticsTable } from "./analytics-table";

type Props = {
  params: { flowId: string; projectId: string; organizationId: string };
  searchParams?: { category?: string };
};

export type EventCategory = {
  key: "starts" | "finishes" | "exits" | "users" | "finish-rate";
  title: string;
  data: { date: string; count: number; type: string }[];
};

export default async function FlowAnalyticsPage({
  params,
  searchParams,
}: Props): Promise<JSX.Element> {
  const analytics = await load(api["/flows/:flowId/analytics"](params.flowId));
  const categoryKey = searchParams?.category ?? "starts";

  const starts = analytics.daily_stats.filter((stat) => stat.type === "startFlow");
  const finishes = analytics.daily_stats.filter((stat) => stat.type === "finishFlow");

  const finishRate =
    starts.length === finishes.length
      ? finishes.map((stat, i) => {
          const startStat = starts[i];
          const count = stat.count / startStat.count;
          return {
            date: stat.date,
            count: isNaN(count) ? 0 : count,
            type: "finishRate",
          };
        })
      : [];

  const categories = [
    {
      key: "starts",
      title: t.analytics.starts,
      data: starts,
    },
    {
      key: "finishes",
      title: t.analytics.finishes,
      data: finishes,
    },
    {
      key: "exits",
      title: t.analytics.exits,
      data: analytics.daily_stats.filter((stat) => stat.type === "cancelFlow"),
    },
    {
      key: "users",
      title: t.analytics.users,
      data: analytics.daily_stats.filter((stat) => stat.type === "uniqueUsers"),
    },
    {
      key: "finish-rate",
      title: t.analytics.finishRate,
      data: finishRate,
    },
  ] as EventCategory[];

  const currentCategory = categories.find((cat) => cat.key === categoryKey);
  const chartData = (currentCategory?.data ?? []).map((bucket) => ({
    label: bucket.date.slice(0, 10),
    value: bucket.count,
  }));

  return (
    <>
      <Box cardWrap="-" height={400} mb="space40">
        {currentCategory ? (
          <AnalyticsChart categoryKey={currentCategory.key} data={chartData} />
        ) : null}
      </Box>

      <AnalyticsTable
        categories={categories}
        currentCategoryKey={categoryKey}
        flowId={params.flowId}
        organizationId={params.organizationId}
        projectId={params.projectId}
      />
    </>
  );
}
