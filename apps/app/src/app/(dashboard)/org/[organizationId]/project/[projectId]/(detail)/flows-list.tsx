import { css } from "@flows/styled-system/css";
import { Check16, CircleSlash16 } from "icons";
import type { FlowPreview } from "lib/api";
import { timeFromNow } from "lib/date";
import Link from "next/link";
import type { FC } from "react";
import { routes } from "routes";
import { Icon, Text } from "ui";

import { CreateFlowDialog } from "./create-flow-dialog";

type Props = {
  organizationId: string;
  projectId: string;
  flows: FlowPreview[];
};

export const FlowsList: FC<Props> = ({ projectId, flows, organizationId }) => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "border",
        backgroundColor: "bg.card",
        borderRadius: "radius12",
        overflow: "hidden",
      })}
    >
      {flows.map((flow) => (
        <Link
          className={css({
            display: "flex",
            py: "space24",
            px: "space24",
            alignItems: "center",
            gap: "space24",
            justifyContent: "space-between",

            fastEaseInOut: "all",

            borderBottomStyle: "solid",
            borderBottomWidth: "1px",
            borderBottomColor: "border",

            color: "text",

            _last: {
              borderBottomStyle: "none",
            },

            "&:hover": {
              bg: "bg.subtleHover",
              color: "text.primary",
            },
          })}
          href={routes.flow({ flowId: flow.id, projectId, organizationId })}
          key={flow.id}
        >
          <Text color="inherit" variant="titleM">
            {flow.name}
          </Text>
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              gap: "space24",
            })}
          >
            <Text
              className={css({
                width: "200px",
              })}
              color="muted"
            >
              Updated {timeFromNow(flow.updated_at)}
            </Text>
            <div
              className={css({
                display: "flex",
                alignItems: "center",
                gap: "space8",
                width: "200px",
              })}
            >
              {flow.enabled_at ? (
                <>
                  <Icon color="icon.success" icon={Check16} />
                  <Text color="success">Published {timeFromNow(flow.enabled_at)}</Text>
                </>
              ) : (
                <>
                  <Icon icon={CircleSlash16} />
                  <Text color="muted">Not published</Text>
                </>
              )}
            </div>
          </div>
        </Link>
      ))}

      {!flows.length && (
        <CreateFlowDialog
          organizationId={organizationId}
          projectId={projectId}
          trigger={
            <button
              className={css({
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                gap: "space8",
                py: "space48",
                cursor: "pointer",

                fastEaseInOut: "all",

                _hover: {
                  bg: "bg.subtleHover",
                },
              })}
              type="button"
            >
              <Text color="muted">Create your first flow</Text>
              <Text color="subtle" variant="bodyXs">
                Guide users through your product and help them achieve their goals.
              </Text>
            </button>
          }
        />
      )}
    </div>
  );
};
