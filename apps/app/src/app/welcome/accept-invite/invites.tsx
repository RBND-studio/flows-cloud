"use client";

import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { useAcceptInvite } from "hooks/use-accept-invite";
import { type Me } from "lib/api";
import type { FC } from "react";
import { Button, Text } from "ui";

type Props = {
  invites: Me["pendingInvites"];
};

export const Invites: FC<Props> = ({ invites }) => {
  const { handleAccept, loading } = useAcceptInvite();

  return (
    <Flex direction="column">
      {invites.map((invite) => (
        <Flex alignItems="center" gap="space8" key={invite.id}>
          <Text
            className={css({
              width: "100%",
            })}
          >
            You&apos;ve been invited to join <strong>{invite.organizationName}</strong>
          </Text>
          <Button loading={loading} onClick={() => handleAccept(invite.id)} size="small">
            Accept
          </Button>
        </Flex>
      ))}
    </Flex>
  );
};
