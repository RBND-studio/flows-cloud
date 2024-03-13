"use client";

import { css } from "@flows/styled-system/css";
import { PasswordChangeDialog } from "app/(dashboard)/user/[userId]/settings/password-change-dialog";
import { useSend } from "hooks/use-send";
import { api } from "lib/api";
import React from "react";
import { Button } from "ui";

export const PasswordChangeForm = (): JSX.Element => {
  const { send, loading } = useSend();
  const handleDeleteAccount = async (): Promise<void> => {
    await send(api["POST /me/delete-account"](), { errorMessage: "Failed to delete account" });
  };
  return (
    <div
      className={css({
        cardWrap: "-",
        p: "space16",
        display: "flex",
        flexDirection: "column",
        gap: "space16",
        mb: "space16",
      })}
    >
      PasswordChangeForm
      <PasswordChangeDialog />
      <Button loading={loading} onClick={handleDeleteAccount}>
        Delete Account
      </Button>
    </div>
  );
};
