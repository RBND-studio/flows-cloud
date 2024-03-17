"use client";
import { css } from "@flows/styled-system/css";
import type { User, UserIdentity } from "@supabase/supabase-js";
import { useSend } from "hooks/use-send";
import { GitHub16, Google16 } from "icons";
import { api } from "lib/api";
import React, { useState } from "react";
import { Avatar, Button, Text, Tooltip } from "ui";

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

  const isDisabled = user.identities?.filter((i) => i.provider !== "email").length === 1;
  return (
    <li
      className={css({
        gap: "space16",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
      })}
      key={identity.id}
    >
      <Avatar
        fullName={identity.identity_data?.name || "Unknown"}
        src={identity.identity_data?.avatar_url}
      />
      {identity.provider === "google" ? (
        <Google16 />
      ) : identity.provider === "github" ? (
        <GitHub16 />
      ) : (
        "Unknown"
      )}
      <Text>
        {identity.provider} - {identity.identity_data?.email}
      </Text>
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
        <Tooltip
          text={isDisabled ? "Cannot unlink the last identity" : "Unlink"}
          trigger={<Text>Unlink</Text>}
        />
      </Button>
    </li>
  );
};
