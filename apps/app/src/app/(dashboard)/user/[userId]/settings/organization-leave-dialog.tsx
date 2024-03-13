"use client";

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
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "ui";

type Props = {
  organization: OrganizationPreview;
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
        <TooltipProvider>
          <TooltipRoot>
            <TooltipTrigger asChild>
              <Button disabled={organization.members === 1} size="small" variant="secondary">
                {t.actions.leave}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {organization.members === 1 ? "You are the last member" : "Leave organization"}
            </TooltipContent>
          </TooltipRoot>
        </TooltipProvider>
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
