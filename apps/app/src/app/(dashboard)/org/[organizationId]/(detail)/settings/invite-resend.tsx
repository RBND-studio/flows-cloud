"use client";

import { useSend } from "hooks/use-send";
import { api } from "lib/api";
import type { FC } from "react";
import { t } from "translations";
import { Button, toast } from "ui";

type Props = {
  organizationId: string;
  email: string;
};

export const InviteResend: FC<Props> = ({ email, organizationId }) => {
  const { send, loading } = useSend();
  const handleResend = async (): Promise<void> => {
    const res = await send(
      api["POST /organizations/:organizationId/users"](organizationId, { email }),
      { errorMessage: t.toasts.sendInviteFailed },
    );
    if (res.error) return;
    toast.success(t.toasts.inviteSent);
  };

  return (
    <Button loading={loading} onClick={handleResend} size="small" variant="secondary">
      Resend
    </Button>
  );
};
