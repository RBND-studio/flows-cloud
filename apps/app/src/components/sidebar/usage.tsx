"use client";

import { css } from "@flows/styled-system/css";
import { useFetch } from "hooks/use-fetch";
import { useParams } from "next/navigation";
import { type FC } from "react";
import { Progress, Text } from "ui";

export const Usage: FC = () => {
  const { organizationId } = useParams<{ organizationId?: string }>();
  const { data } = useFetch(
    "/organizations/:organizationId",
    organizationId ? [organizationId] : null,
  );

  if (!organizationId || !data) return null;

  const { usage, limit, estimated_price } = data;

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "2px",

        backgroundColor: "bg.muted",
        bor: "1px",
        borderRadius: "radius8",

        paddingY: "space8",
        paddingX: "space8",

        marginX: "space8",
      })}
    >
      <Text variant="titleS" className={css({ mb: "space4" })}>
        Usage:{" "}
        <Text as="span" color="muted">
          {usage} / {limit}
        </Text>
      </Text>
      <Progress max={limit} value={usage} />
      <Text>Price: ${estimated_price?.toFixed(2)}</Text>
    </div>
  );
};
