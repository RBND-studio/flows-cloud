"use client";

import { css } from "@flows/styled-system/css";
import { useAcceptInvite } from "hooks/use-accept-invite";
import { useFetch } from "hooks/use-fetch";
import type { FC } from "react";
import { Button, Text } from "ui";

export const Invites: FC = () => {
  const { data } = useFetch("/me");

  const { handleAccept, loading } = useAcceptInvite();

  if (!data?.pendingInvites.length) return null;

  return data.pendingInvites.map((invite) => (
    <div
      className={css({
        maxWidth: "1100px",
        mx: "space8",
        padding: "space12",
        display: "flex",
        flexDirection: "column",
        borderRadius: "radius8",
        gap: "space8",
        bor: "1px",
        backgroundColor: "bg.muted",
      })}
      key={invite.id}
    >
      <Text>
        You&apos;ve been invited to join <strong>{invite.organizationName}</strong>
      </Text>
      <Button loading={loading} onClick={() => handleAccept(invite.id)} size="small">
        Accept
      </Button>
    </div>
  ));
};
