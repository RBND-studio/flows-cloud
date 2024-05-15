"use client";

import { css } from "@flows/styled-system/css";
import { useAuth } from "auth/client";
import { useFetch } from "hooks/use-fetch";
import { useSend } from "hooks/use-send";
import { api } from "lib/api";
import React from "react";
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

type DeleteAccountForm = {
  email: string;
};

export const DeleteAccountDialog = (): JSX.Element => {
  const { register, handleSubmit, formState, reset } = useForm<DeleteAccountForm>({
    defaultValues: { email: "" },
  });
  const { auth, logout, processingLogout } = useAuth();

  const { data: organizations, isLoading: organizationsIsLoading } = useFetch("/organizations");

  const { send, loading } = useSend();

  const onSubmit: SubmitHandler<DeleteAccountForm> = (data): void => {
    toast.promise(handleDeleteAccount(data), {
      loading: "Deleting account...",
      success: () => {
        return "Account deleted";
      },
      error: (err: Error) => {
        return err.message;
      },
    });
  };

  const handleDeleteAccount = async (data: DeleteAccountForm): Promise<void> => {
    if (data.email !== auth?.user.email) {
      throw new Error("Email does not match");
    }
    if (organizations?.some((org) => org.members_count === 1)) {
      throw new Error(
        "You're still a member of at least one organization. Leave all organizations first or delete the ones where you're the only member.",
      );
    }
    const { error } = await send(api["DELETE /me"](), { errorMessage: null });

    if (error) {
      throw error;
    }
    logout();
  };

  const isDisabled = !formState.isDirty || organizationsIsLoading || processingLogout || loading;
  return (
    <Dialog
      maxWidth={600}
      trigger={
        <Button size="small" variant="danger">
          {t.personal.deleteAccount.title}
        </Button>
      }
      onOpenChange={() => reset()}
    >
      <DialogTitle> {t.personal.deleteAccount.title}</DialogTitle>
      <DialogContent>
        <form id="delete-account" onSubmit={handleSubmit(onSubmit)}>
          <Text mb="space24" variant="bodyS">
            {t.personal.deleteAccount.description}
          </Text>
          <Input
            {...register("email")}
            label={
              <>
                Enter{" "}
                <span
                  className={css({
                    fontWeight: 700,
                  })}
                >
                  {auth?.user.email}
                </span>{" "}
                to confirm
              </>
            }
            placeholder={auth?.user.email}
            type="e-mail"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <DialogClose asChild>
          <Button shadow="none" size="small" variant="secondary">
            {t.personal.deleteAccount.cancel}
          </Button>
        </DialogClose>
        <Button
          disabled={isDisabled}
          loading={loading}
          type="submit"
          form="delete-account"
          size="small"
          variant="danger"
        >
          {t.personal.deleteAccount.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
