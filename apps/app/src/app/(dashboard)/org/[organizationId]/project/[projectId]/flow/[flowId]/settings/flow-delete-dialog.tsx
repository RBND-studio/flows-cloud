"use client";

import { useSend } from "hooks/use-send";
import type { FlowDetail, FlowPreview } from "lib/api";
import { api } from "lib/api";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { routes } from "routes";
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
  flow: FlowPreview | FlowDetail;
  organizationId: string;
  trigger: React.ReactNode;
};

export const FlowDeleteDialog: FC<Props> = ({ flow, organizationId, trigger }) => {
  const router = useRouter();
  const { send, loading } = useSend();
  const handleDelete = async (): Promise<void> => {
    const res = await send(api["DELETE /flows/:flowId"](flow.id), {
      errorMessage: t.toasts.deleteFlowFailed,
    });
    if (res.error) return;
    toast.success(t.toasts.deleteFlowSuccess);
    router.refresh();
    router.replace(routes.project({ projectId: flow.project_id, organizationId }));
  };

  return (
    <Dialog trigger={trigger}>
      <DialogTitle>{t.flow.deleteDialog.confirm}</DialogTitle>
      <DialogContent>
        <Text>{t.flow.deleteDialog.description}</Text>
      </DialogContent>
      <DialogActions>
        <DialogClose asChild>
          <Button shadow={false} size="small" variant="secondary">
            {t.actions.close}
          </Button>
        </DialogClose>
        <Button loading={loading} onClick={handleDelete} size="small" variant="primary">
          {t.flow.deleteDialog.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
