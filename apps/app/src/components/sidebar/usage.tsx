"use client";

import { css } from "@flows/styled-system/css";
import { Box } from "@flows/styled-system/jsx";
import { useFetch } from "hooks/use-fetch";
import { useParams } from "next/navigation";
import { type FC } from "react";
import { formatNumberWithThousandSeparator } from "shared";
import { Progress, Text } from "ui";

export const Usage: FC = () => {
  const { organizationId } = useParams<{ organizationId?: string }>();
  const { data } = useFetch(
    "/organizations/:organizationId",
    organizationId ? [organizationId] : null,
  );

  if (!organizationId || !data) return null;

  const { usage, limit } = data;

  return (
    <Box>
      <Text variant="titleS" className={css({ mb: "space4" })}>
        Usage:{" "}
        <Text as="span" color="muted">
          {formatNumberWithThousandSeparator(usage)} / {formatNumberWithThousandSeparator(limit)}
        </Text>
      </Text>
      <Progress max={limit} value={usage} />
    </Box>
  );
};
