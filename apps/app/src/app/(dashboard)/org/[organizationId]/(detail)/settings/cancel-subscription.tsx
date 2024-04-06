"use client";

import { css } from "@flows/styled-system/css";
import { mutate } from "hooks/use-fetch";
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
  organizationId: string;
};

export const CancelSubscription: FC<Props> = ({ subscriptionId, organizationId }) => {
  const [open, setOpen] = useState(false);
  const [waitingForWebhook, setWaitingForWebhook] = useState(false);
  const { loading, send } = useSend();
  const router = useRouter();

  const handleCancel = async (): Promise<void> => {
    const res = await send(api["POST /subscriptions/:subscriptionId/cancel"](subscriptionId), {
      errorMessage: t.toasts.cancelSubscriptionFailed,
    });
    if (res.error) return;
    toast.success(t.toasts.cancelSubscriptionSuccess);
    setOpen(false);

    setWaitingForWebhook(true);
    setTimeout(() => {
      router.refresh();
      void mutate("/organizations/:organizationId", [organizationId]);
      setWaitingForWebhook(false);
    }, 5000);
  };

  return (
    <Dialog
      onOpenChange={setOpen}
      open={open}
      trigger={
        //TODO: add danger variant when personal settings are merged
        <Button variant="secondary" loading={waitingForWebhook}>
          Cancel subscription
        </Button>
      }
    >
      <DialogTitle>Cancel subscription</DialogTitle>
      <DialogContent>
        <Text className={css({ mb: "space8" })}>
          Are you sure you want to cancel your subscription?
        </Text>
        <Text>
          Your usage limit will be reset immediately to free tier and you will be charged based on
          your current usage at the end of your billing period.
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
