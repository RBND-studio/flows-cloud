"use client";

import { css } from "@flows/styled-system/css";
import { useAuth } from "auth/client";
import { useFetch } from "hooks/use-fetch";
import { useSend } from "hooks/use-send";
import { api } from "lib/api";
import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
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
  const { register, handleSubmit, formState } = useForm<DeleteAccountForm>({
    defaultValues: {
      email: "",
    },
  });
  const { auth, logout, processingLogout } = useAuth();

  const { data: organizations, isLoading: organizationsIsLoading } = useFetch("/organizations");
  const [isLoading, setIsLoading] = useState(false);
  const { send, loading } = useSend();

  const onSubmit: SubmitHandler<DeleteAccountForm> = (data): void => {
    setIsLoading(true);
    toast.promise(handleDeleteAccount(data), {
      loading: "Deleting account...",
      success: () => {
        setIsLoading(false);
        return "Account deleted";
      },
      error: (err: Error) => {
        setIsLoading(false);
        return err.message;
      },
    });
  };

  const handleDeleteAccount = async (data: DeleteAccountForm): Promise<void> => {
    // eslint-disable-next-line no-promise-executor-return -- aaa
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (data.email !== auth?.user.email) {
      throw new Error("Email does not match");
    }
    if (organizations?.some((org) => org.members === 1)) {
      throw new Error(
        "You're still a member of at least one organization. Leave all organizations first or delete the ones where you're the only member.",
      );
    }
    await send(api["DELETE /me"](), { errorMessage: "Failed to delete account" });
    // eslint-disable-next-line no-promise-executor-return -- aaa
    await new Promise((resolve) => setTimeout(resolve, 2000));
    logout();
  };

  const isDisabled =
    !formState.isDirty || isLoading || organizationsIsLoading || processingLogout || loading;
  return (
    <Dialog
      maxWidth={600}
      trigger={
        <Button size="small" variant="danger">
          Delete Account
        </Button>
      }
    >
      <DialogTitle>Delete account</DialogTitle>
      <DialogContent>
        <form
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "space32",
          })}
        >
          <Text variant="bodyS">
            Deleting your account removes all your data from Flows permanently. We&apos;ll be sad to
            see you go. Do you wish to proceed?
          </Text>
          <Input
            {...register("email")}
            label={`Enter your email to confirm (${auth?.user.email})`}
            placeholder={auth?.user.email}
            type="e-mail"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <DialogClose asChild>
          <Button shadow="none" size="small" variant="secondary">
            Don&apos;t delete
          </Button>
        </DialogClose>
        <Button
          disabled={isDisabled}
          loading={isLoading}
          onClick={handleSubmit(onSubmit)}
          size="small"
          type="submit"
          variant="danger"
        >
          Delete account
        </Button>
      </DialogActions>
    </Dialog>
  );
};
