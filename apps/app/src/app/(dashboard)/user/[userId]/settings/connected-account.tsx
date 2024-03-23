"use client";
import { css } from "@flows/styled-system/css";
import type { User, UserIdentity } from "@supabase/supabase-js";
import { useSend } from "hooks/use-send";
import { GitHub16, Google16, Mail16 } from "icons";
import { api } from "lib/api";
import { useState } from "react";
import { t } from "translations";
import { Button, Text, Tooltip } from "ui";

import { PasswordChangeDialog } from "./password-change-dialog";

type ConnectedAccountProps = {
  user: User;
  identity: UserIdentity;
  onUnlink: () => void;
};

export const ConnectedAccount = ({
  identity,
  user,
  onUnlink,
}: ConnectedAccountProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  const { send } = useSend();
  const handleUnlink = async (): Promise<void> => {
    setIsLoading(true);
    await send(api["DELETE /me/identities/:providerId"](identity.id), {
      errorMessage: "Failed to unlink account",
    });
    onUnlink();
    setIsLoading(false);
  };

  //TODO: @pesickadavid email should be visible always and allow creating password even if the email identity doesn't exist

  const isDisabled = user.identities?.length === 1;
  return (
    <li
      className={css({
        gap: "space12",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
      })}
      key={identity.id}
    >
      {identity.provider === "google" ? (
        <Google16 />
      ) : identity.provider === "github" ? (
        <GitHub16 />
      ) : (
        <Mail16 />
      )}
      <Text>{identity.identity_data?.email}</Text>
      {identity.provider !== "email" ? (
        <Tooltip
          text={isDisabled ? t.personal.connectedAccounts.lastProvider : ""}
          trigger={
            <Button
              className={css({
                _disabled: {
                  pointerEvents: "unset",
                },
                ml: "auto",
              })}
              disabled={isDisabled}
              loading={isLoading}
              onClick={handleUnlink}
              size="small"
              variant="danger"
            >
              {t.actions.unlink}
            </Button>
          }
        />
      ) : (
        <PasswordChangeDialog />
      )}
    </li>
  );
};
