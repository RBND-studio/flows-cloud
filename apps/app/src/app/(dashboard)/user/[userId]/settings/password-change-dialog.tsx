"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordSchema } from "lib/validation-schemas";
import { useRouter } from "next/navigation";
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
import { type z } from "zod";

type PasswordChangeDialogProps = {
  hasPassword: boolean;
};

type PasswordChangeForm = z.infer<typeof PasswordSchema>;

export const PasswordChangeDialog = ({
  hasPassword,
}: PasswordChangeDialogProps): JSX.Element | null => {
  const [open, setOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const { register, handleSubmit, formState, reset } = useForm<PasswordChangeForm>({
    defaultValues: {
      password: "",
    },
    resolver: zodResolver(PasswordSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<PasswordChangeForm> = async (data): Promise<void> => {
    setIsLoading(true);
    const res = await supabase.auth.updateUser({ password: data.password });

    if (res.error) {
      toast.error(res.error.message);
    } else {
      toast.success(t.toasts.passwordUpdated);
    }
    reset();

    setIsLoading(false);
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button size="small" variant="secondary">
          {hasPassword
            ? t.personal.connectedAccounts.changePassword
            : t.personal.connectedAccounts.createPassword}
        </Button>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{t.personal.connectedAccounts.changePassword}</DialogTitle>
        <DialogContent>
          <Input
            {...register("password")}
            label="New password"
            type="password"
            description={formState.errors.password?.message ?? ""}
            error={!!formState.errors.password}
          />
        </DialogContent>
        <DialogActions>
          <DialogClose asChild>
            <Button shadow="none" size="small" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button loading={isLoading} size="small" type="submit" variant="primary">
            {t.actions.save}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
