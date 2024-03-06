import { css } from "@flows/styled-system/css";
import { PasswordChangeDialog } from "app/(dashboard)/user/[userId]/settings/password-change-dialog";
import React from "react";

export const PasswordChangeForm = (): JSX.Element => {
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
    </div>
  );
};
