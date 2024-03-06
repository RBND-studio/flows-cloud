"use client";

import { useSend } from "hooks/use-send";
import type { OrganizationDetail } from "lib/api";
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
} from "ui";

type Props = {
  organization: OrganizationDetail;
};

export const OrganizationLeaveDialog: FC<Props> = ({ organization }) => {
  const router = useRouter();
  const { send, loading } = useSend();
  const handleDelete = async (): Promise<void> => {
    const res = await send(
      api["POST /organizations/:organizationId/users/leave"](organization.id),
      { errorMessage: t.toasts.removeMemberFailed },
    );
    if (res.error) return;
    toast.success(t.toasts.memberRemoved);
    router.refresh();
  };

  return (
    <Dialog
      trigger={
        <Button size="small" variant="secondary">
          {t.actions.leave}
        </Button>
      }
    >
      <DialogTitle>Leave organization</DialogTitle>
      <DialogContent>
        <Text>Are you sure you want to leave {organization.name}?</Text>
      </DialogContent>
      <DialogActions>
        <DialogClose asChild>
          <Button shadow="none" size="small" variant="secondary">
            Close
          </Button>
        </DialogClose>
        <Button loading={loading} onClick={handleDelete} size="small" variant="primary">
          Leave
        </Button>
      </DialogActions>
    </Dialog>
  );
};
