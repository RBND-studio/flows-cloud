"use client";

import { Flex } from "@flows/styled-system/jsx";
import { MenuItem } from "components/header/menu-item";
import { MenuSection } from "components/header/menu-section";
import { useSend } from "hooks/use-send";
import { KebabHorizontal16 } from "icons";
import { api, type FlowDetail } from "lib/api";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { t } from "translations";
import { Button, Icon, Popover, PopoverContent, PopoverTrigger, Switch, Text, toast } from "ui";

import { FlowPreviewDialog } from "./flow-preview-dialog";
import { FlowPublishChangesDialog } from "./flow-publish-changes-dialog";
import { FlowDeleteDialog } from "./settings/flow-delete-dialog";

type Props = {
  flow: FlowDetail;
  params: { flowId: string; projectId: string; organizationId: string };
};

export const FlowHeader: FC<Props> = ({ flow, params }) => {
  //TODO: Improve local flow options
  const flowIsCloud = flow.flow_type === "cloud";
  const flowIsPublic = flow.enabled_at !== null;

  const { loading, send } = useSend();
  const router = useRouter();
  const handlePublishedToggle = async (enabled: boolean): Promise<void> => {
    const res = await send(
      api["PATCH /flows/:flowId"](flow.id, {
        enabled,
      }),
      { errorMessage: enabled ? t.toasts.enableFlowFailed : t.toasts.disableFlowFailed },
    );
    if (res.error) return;
    toast.success(enabled ? t.toasts.enableFlowSuccess : t.toasts.disableFlowSuccess);
    router.refresh();
  };

  const POPOVER_OPTIONS = [
    {
      item: (
        <FlowDeleteDialog
          flow={flow}
          key="delete"
          organizationId={params.organizationId}
          trigger={
            <MenuItem>
              <Text as="span">Delete</Text>
            </MenuItem>
          }
        />
      ),
    },
    {
      item: (
        <MenuItem as="button" key="duplicate">
          <Text as="span">Duplicate TODO</Text>
        </MenuItem>
      ),
    },
  ];
  return (
    <Flex flexDirection="column" gap="space8" mb="space16">
      <Flex justifyContent="space-between">
        <Text variant="titleXl">{flow.name}</Text>
        {flowIsCloud ? (
          <Flex alignItems="center" gap="space16">
            <FlowPublishChangesDialog flow={flow} />
            <FlowPreviewDialog flow={flow} />
            <Flex gap="space8">
              <Text weight="600">Live</Text>
              <Switch checked={flowIsPublic} disabled={loading} onChange={handlePublishedToggle} />
            </Flex>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost">
                  <Icon icon={KebabHorizontal16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <MenuSection>{POPOVER_OPTIONS.map((option) => option.item)}</MenuSection>
              </PopoverContent>
            </Popover>
          </Flex>
        ) : (
          <Text>Local flow</Text>
        )}
      </Flex>
      {flow.description.length > 0 && <Text color="muted">{flow.description}</Text>}
    </Flex>
  );
};
