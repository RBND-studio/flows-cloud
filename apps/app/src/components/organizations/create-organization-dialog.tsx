"use client";

import { mutate } from "hooks/use-fetch";
import { useSend } from "hooks/use-send";
import { api } from "lib/api";
import { useRouter } from "next/navigation";
import { type FC, type ReactNode, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { routes } from "routes";
import { t } from "translations";
import {
  Button,
  Dialog,
  DialogActions,
  DialogClose,
  DialogContent,
  DialogTitle,
  Input,
  toast,
} from "ui";

type Props = {
  trigger: ReactNode;
};

type FormData = {
  name: string;
};

export const CreateOrganizationDialog: FC<Props> = ({ trigger }) => {
  const [open, setOpen] = useState(false);
  const { handleSubmit, register } = useForm<FormData>();
  const router = useRouter();
  const { send, loading } = useSend();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const res = await send(api["POST /organizations"](data), {
      errorMessage: t.toasts.createOrgFailed,
    });
    if (!res.data) return;
    setOpen(false);
    toast.success(t.toasts.createOrgSuccess);
    void mutate("/organizations");

    router.push(routes.organization({ organizationId: res.data.id }));
  };

  return (
    <Dialog onOpenChange={setOpen} open={open} trigger={trigger}>
      <DialogTitle>Create Organization</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Input {...register("name")} label="Name" />
        </DialogContent>
        <DialogActions>
          <DialogClose asChild>
            <Button shadow="none" size="small" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button loading={loading} size="small" type="submit">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
