"use client";

import { css } from "@flows/styled-system/css";
import { useSend } from "hooks/use-send";
import { api } from "lib/api";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";
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
  subscriptionId: string;
};

export const CancelSubscription: FC<Props> = ({ subscriptionId }) => {
  const [open, setOpen] = useState(false);
  const { loading, send } = useSend();
  const router = useRouter();
  const handleCancel = async (): Promise<void> => {
    const res = await send(api["POST /subscriptions/:subscriptionId/cancel"](subscriptionId), {
      errorMessage: t.toasts.cancelSubscriptionFailed,
    });
    if (res.error) return;
    toast.success(t.toasts.cancelSubscriptionSuccess);
    router.refresh();
    setOpen(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open} trigger={<Button>Cancel</Button>}>
      <DialogTitle>Cancel subscription</DialogTitle>
      <DialogContent>
        <Text className={css({ mb: "space8" })}>
          Are you sure you want to cancel your subscription?
        </Text>
        <Text>
          Your usage limit will be reset immediately to free tier and you will be charged by amount
          of current usage at the end of this month.
        </Text>
      </DialogContent>
      <DialogActions>
        <DialogClose asChild>
          <Button shadow="none" size="small" variant="secondary">
            Close
          </Button>
        </DialogClose>
        <Button loading={loading} onClick={handleCancel} size="small" variant="primary">
          Cancel subscription
        </Button>
      </DialogActions>
    </Dialog>
  );
};
