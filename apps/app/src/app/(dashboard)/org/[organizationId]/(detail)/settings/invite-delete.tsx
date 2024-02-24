"use client";

import { useSend } from "hooks/use-send";
import { api } from "lib/api";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { t } from "translations";
import { Button, toast } from "ui";

type Props = {
  inviteId: string;
};

export const InviteDelete: FC<Props> = ({ inviteId }) => {
  const { send, loading } = useSend();
  const router = useRouter();
  const handleDelete = async (): Promise<void> => {
    const res = await send(api["DELETE /invites/:inviteId"](inviteId), {
      errorMessage: t.toasts.deleteInviteFailed,
    });
    if (res.error) return;
    router.refresh();
    toast.success(t.toasts.deleteInviteSuccess);
  };

  return (
    <Button loading={loading} onClick={handleDelete} size="small" variant="secondary">
      Remove
    </Button>
  );
};
