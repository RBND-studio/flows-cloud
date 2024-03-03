"use client";

import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { token } from "@flows/styled-system/tokens";
import type { TickRendererProps } from "@visx/axis";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { localPoint } from "@visx/event";
import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { scaleLinear, scalePoint } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { useTooltip } from "@visx/tooltip";
import { ChartTooltip } from "components/ui/chart-tooltip";
import { monthDay } from "lib/date";
import type { FC, MouseEvent, ReactNode, TouchEvent } from "react";
import { useCallback, useMemo } from "react";
import { Text } from "ui";

export type LineChartItem = {
  label: string;
  value: number;
};

type Props = {
  data: LineChartItem[];
  renderTooltip?: (item: LineChartItem) => ReactNode;
};

type InnerProps = Props & {
  width: number;
  height: number;
};

const LineChartWithoutSize: FC<InnerProps> = ({ data, height, width, renderTooltip }) => {
  const axisLeftWidth = 40;
  const axisLeftLineHeight = 16;
  const axisLeftAxisLinePadding = 8;
  const axisBottomHeight = 32;
  const paddingTop = 8;
  const paddingRight = 24;
  const axisBottomTickWidth = 80;
  const highlightDot = 6;

  const minValue = 0;
  const maxValue = useMemo(() => Math.max(...data.map((item) => item.value)), [data]);
  const labels = useMemo(() => data.map((item) => item.label), [data]);

  const chartWidth = Math.max(width - axisLeftWidth - paddingRight, 0);
  const chartHeight = Math.max(height - axisBottomHeight - paddingTop, 0);
  const labelScale = useMemo(
    () => scalePoint({ domain: labels, range: [0, chartWidth] }),
    [labels, chartWidth],
  );
  const valueScale = useMemo(
    () => scaleLinear({ domain: [minValue, maxValue], range: [chartHeight, 0] }),
    [chartHeight, maxValue],
  );
  const xRangeToLabel = useMemo(
    () =>
      scaleLinear({
        domain: [axisLeftWidth, width - paddingRight],
        range: [0, labels.length - 1],
      }),
    [labels.length, width],
  );

  const tooltipProps = useTooltip<LineChartItem>();
  const tooltipContent = useMemo(() => {
    const item = tooltipProps.tooltipData;
    if (!item) return;
    return renderTooltip?.(item);
  }, [renderTooltip, tooltipProps.tooltipData]);
  const handleTooltip = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!renderTooltip) return;
      const point = localPoint(e);
      if (!point) return;
      const itemIndex = Math.round(xRangeToLabel(point.x));
      const item = data.at(itemIndex);
      if (!item) return;
      tooltipProps.showTooltip({
        tooltipTop: point.y,
        tooltipLeft: point.x,
        tooltipData: item,
      });
    },
    [data, renderTooltip, tooltipProps, xRangeToLabel],
  );

  const axisLeftTickComponent = useCallback(
    (p: TickRendererProps) => (
      <foreignObject
        height={axisLeftLineHeight}
        width={axisLeftWidth - axisLeftAxisLinePadding}
        x={-axisLeftWidth}
        y={p.y - axisLeftLineHeight / 2}
      >
        <Flex alignItems="center" height="100%">
          <Text align="right" className={css({ flex: 1 })} color="muted" variant="bodyXs">
            {p.formattedValue}
          </Text>
        </Flex>
      </foreignObject>
    ),
    [],
  );
  const axisBottomTickComponent = useCallback(
    (p: TickRendererProps) => (
      <foreignObject
        height={axisBottomHeight}
        width={axisBottomTickWidth}
        x={p.x - axisBottomTickWidth / 2}
        y={0}
      >
        <Flex alignItems="center" height="100%" justifyContent="center">
          <Text align="center" color="muted" variant="bodyXs">
            {p.formattedValue}
          </Text>
        </Flex>
      </foreignObject>
    ),
    [],
  );

  return (
    <ChartTooltip {...tooltipProps} content={tooltipContent}>
      {({ containerRef }) => (
        <svg height={height} ref={containerRef} width={width}>
          <AxisLeft
            hideTicks
            hideZero
            left={axisLeftWidth}
            numTicks={5}
            scale={valueScale}
            stroke={token("colors.border")}
            tickComponent={axisLeftTickComponent}
            top={paddingTop}
          />

          <Group left={axisLeftWidth} top={paddingTop}>
            <AxisBottom
              hideTicks
              numTicks={6}
              scale={labelScale}
              stroke={token("colors.border")}
              tickComponent={axisBottomTickComponent}
              tickFormat={(v) => monthDay(v)}
              top={chartHeight}
            />
            <LinePath
              data={data}
              stroke={token("colors.border.info")}
              strokeWidth={2}
              x={(d) => (labelScale(d.label) ?? 0) + labelScale.bandwidth() / 2}
              y={(d) => valueScale(d.value)}
            />
            {tooltipProps.tooltipData ? (
              <circle
                cx={labelScale(tooltipProps.tooltipData.label)}
                cy={valueScale(tooltipProps.tooltipData.value)}
                fill={token("colors.border.info")}
                r={highlightDot}
                stroke={token("colors.bg")}
                strokeWidth={3}
              />
            ) : null}
            <rect
              fill="transparent"
              height={chartHeight}
              onMouseLeave={tooltipProps.hideTooltip}
              onMouseMove={handleTooltip}
              onTouchMove={handleTooltip}
              onTouchStart={handleTooltip}
              width={chartWidth}
              x={0}
              y={0}
            />
          </Group>
        </svg>
      )}
    </ChartTooltip>
  );
};

export const LineChart: FC<Props> = (props) => {
  return (
    <ParentSize>
      {({ height, width }) => <LineChartWithoutSize {...props} height={height} width={width} />}
    </ParentSize>
  );
};
