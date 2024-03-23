"use client";

import { css } from "@flows/styled-system/css";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { createClient } from "supabase/client";
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

type PasswordChangeForm = {
  password: string;
};

export const PasswordChangeDialog = (): JSX.Element => {
  const supabase = createClient();
  const { register, handleSubmit, formState, reset } = useForm<PasswordChangeForm>({
    defaultValues: {
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<PasswordChangeForm> = async (data): Promise<void> => {
    setIsLoading(true);
    const res = await supabase.auth.updateUser({ password: data.password });

    if (res.error) {
      toast.error(res.error.message);
    }
    reset({
      password: "",
    });
    toast.success(t.toasts.updateOrgSuccess);
    setIsLoading(false);
  };

  return (
    <Dialog
      trigger={
        <Button
          size="small"
          variant="secondary"
          className={css({
            ml: "auto",
          })}
        >
          {t.personal.connectedAccounts.password}
        </Button>
      }
    >
      <DialogTitle>{t.personal.connectedAccounts.password}</DialogTitle>
      <DialogContent>
        <form>
          <Input {...register("password")} label="New password" type="password" />
        </form>
      </DialogContent>
      <DialogActions>
        <DialogClose asChild>
          <Button shadow="none" size="small" variant="secondary">
            Close
          </Button>
        </DialogClose>
        <Button
          disabled={!formState.isDirty}
          loading={isLoading}
          onClick={handleSubmit(onSubmit)}
          size="small"
          type="submit"
          variant="primary"
        >
          {t.actions.save}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
