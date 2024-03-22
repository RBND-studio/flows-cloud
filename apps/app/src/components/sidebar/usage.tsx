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
    organizationId ? [organizationId] : undefined,
  );

  if (!organizationId || !data) return null;

  const usage = data.usage;

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
          {usage} / 1000
        </Text>
      </Text>
      <Progress max={1000} value={usage} />
    </div>
  );
};
