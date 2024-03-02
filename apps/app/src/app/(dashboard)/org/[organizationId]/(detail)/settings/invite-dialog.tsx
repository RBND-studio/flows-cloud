"use client";

import { css } from "@flows/styled-system/css";
import { useSend } from "hooks/use-send";
import { Plus16 } from "icons";
import { api } from "lib/api";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { t } from "translations";
import {
  Button,
  Dialog,
  DialogActions,
  DialogClose,
  DialogContent,
  DialogTitle,
  Input,
  Text,
  toast,
} from "ui";

type Props = {
  organizationId: string;
};

type FormData = {
  email: string;
};

export const InviteDialog: FC<Props> = ({ organizationId }) => {
  const [open, setOpen] = useState(false);
  const { send, loading } = useSend();
  const router = useRouter();

  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const res = await send(api["POST /organizations/:organizationId/users"](organizationId, data), {
      errorMessage: t.toasts.sendInviteFailed,
    });
    if (res.error) return;
    toast.success(t.toasts.inviteSent);
    router.refresh();
    setOpen(false);
  };

  return (
    <Dialog
      onOpenChange={setOpen}
      open={open}
      trigger={
        <Button startIcon={<Plus16 />} variant="secondary">
          {t.organization.members.addDialog.button}
        </Button>
      }
    >
      <DialogTitle>{t.organization.members.addDialog.title}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Text
            className={css({
              mb: "space16",
            })}
          >
            {t.organization.members.addDialog.description}
          </Text>
          <Input {...register("email")} label="Email" required type="email" />
        </DialogContent>
        <DialogActions>
          <DialogClose asChild>
            <Button shadow={false} size="small" variant="secondary">
              {t.actions.close}
            </Button>
          </DialogClose>
          <Button loading={loading} size="small" type="submit">
            {t.organization.members.addDialog.confirm}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
