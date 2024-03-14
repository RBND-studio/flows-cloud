import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import type { FlowVersion } from "lib/api";
import Link from "next/link";
import type { FC } from "react";
import { routes } from "routes";
import { Text } from "ui";

type Props = {
  versions: FlowVersion[];
  activeVersionId?: string;
  organizationId: string;
  projectId: string;
  flowId: string;
};

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
});

const formatDate = (date: string): string => {
  const d = new Date(date);
  return formatter.format(d);
};

export const VersionList: FC<Props> = ({
  versions,
  activeVersionId,
  flowId,
  organizationId,
  projectId,
}) => {
  return (
    <Flex flexDirection="column" gap="space8">
      {versions.map((version) => {
        const active = version.id === activeVersionId;
        return (
          <Link
            href={routes.flowVersions({ flowId, organizationId, projectId, versionId: version.id })}
            key={version.id}
          >
            <div
              className={css({
                bor: "1px",
                borderRadius: "radius8",
                px: "space8",
                py: "space8",

                fastEaseInOut: "all",

                _hover: {
                  backgroundColor: "bg.hover",
                },
                cursor: active ? "default" : undefined,

                "&&&": {
                  backgroundColor: active ? "bg.subtle" : undefined,
                  borderColor: active ? "border" : "transparent",
                },
              })}
            >
              <Text color={active ? "default" : "subtle"} weight="600">
                {formatDate(version.created_at)}
              </Text>
            </div>
          </Link>
        );
      })}
    </Flex>
  );
};
