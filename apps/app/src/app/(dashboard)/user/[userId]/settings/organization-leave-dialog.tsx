"use client";

import { css } from "@flows/styled-system/css";
import { useSend } from "hooks/use-send";
import type { OrganizationPreview } from "lib/api";
import { api } from "lib/api";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { t } from "translations";
import {
  Button,
  Dialog,
  DialogActions,
  DialogClose,
  DialogContent,
  DialogTitle,
  Text,
  toast,
  Tooltip,
} from "ui";

type Props = {
  organization: OrganizationPreview;
};

export const OrganizationLeaveDialog: FC<Props> = ({ organization }) => {
  const router = useRouter();
  const { send, loading } = useSend();

  if (organization.members === 1) {
    return (
      <Tooltip
        text={t.personal.organizations.leaveDialog.tooltip}
        trigger={
          <Button
            className={css({
              _disabled: {
                pointerEvents: "unset",
              },
            })}
            disabled
            size="small"
            variant="danger"
          >
            {t.actions.leave}
          </Button>
        }
      />
    );
  }
  const handleDelete = async (): Promise<void> => {
    const res = await send(
      api["POST /organizations/:organizationId/users/leave"](organization.id),
      { errorMessage: t.toasts.removeMemberFailed },
    );
    if (res.error) {
      toast.error(res.error.message);
      return;
    }
    toast.success(t.toasts.memberRemoved);
    router.refresh();
  };
  return (
    <Dialog
      trigger={
        <Button size="small" variant="danger">
          {t.actions.leave}
        </Button>
      }
    >
      <DialogTitle>{t.personal.organizations.leaveDialog.title}</DialogTitle>
      <DialogContent>
        <Text>Are you sure you want to leave {organization.name}?</Text>
      </DialogContent>
      <DialogActions>
        <DialogClose asChild>
          <Button shadow="none" size="small" variant="secondary">
            {t.actions.close}
          </Button>
        </DialogClose>
        <Button loading={loading} onClick={handleDelete} size="small" variant="primary">
          {t.actions.leave}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
