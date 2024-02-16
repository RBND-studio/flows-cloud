"use client";

import { mutate } from "hooks/use-fetch";
import { useSend } from "hooks/use-send";
import type { OrganizationDetail } from "lib/api";
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
  organization: OrganizationDetail;
};

export const OrganizationDeleteDialog: FC<Props> = ({ organization }) => {
  const router = useRouter();
  const { send, loading } = useSend();
  const handleDelete = async (): Promise<void> => {
    const res = await send(api["DELETE /organizations/:organizationId"](organization.id), {
      errorMessage: t.toasts.deleteOrgFailed,
    });
    if (res.error) return;
    toast.success(t.toasts.deleteOrgSuccess);
    void mutate("/organizations");
    router.refresh();
    router.replace(routes.home);
  };

  return (
    <Dialog trigger={<Button variant="secondary">{t.actions.delete}</Button>}>
      <DialogTitle>{t.organization.deleteDialog.title}</DialogTitle>
      <DialogContent>
        <Text>{t.organization.deleteDialog.description}</Text>
      </DialogContent>
      <DialogActions>
        <DialogClose asChild>
          <Button shadow={false} size="small" variant="secondary">
            {t.actions.close}
          </Button>
        </DialogClose>
        <Button loading={loading} onClick={handleDelete} size="small" variant="primary">
          {t.organization.deleteDialog.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
