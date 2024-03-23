"use client";

import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import type { User } from "@supabase/supabase-js";
import { useFirstRender } from "hooks/use-first-render";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "supabase/client";
import { t } from "translations";
import { Text, toast } from "ui";

import { ConnectedAccount } from "./connected-account";

export const ConnectedAccounts = (): JSX.Element => {
  const supabase = createClient();
  const firstRender = useFirstRender();
  const [user, setUser] = useState<User | null>(null);

  const getUser = useCallback(async (): Promise<User | null> => {
    const {
      data: { user: userData },
    } = await supabase.auth.getUser();
    return userData;
  }, [supabase.auth]);

  useEffect(() => {
    if (!firstRender) return;
    getUser()
      .then(setUser)
      .catch((e: Error) => toast.error(e.message));
  }, [firstRender, getUser]);

  return (
    <Flex cardWrap="-" flexDirection="column" mb="space16" p="space16">
      <Flex flexDirection="column" mb="space16">
        <Text variant="titleL">{t.personal.connectedAccounts.title}</Text>
        <Text color="muted">{t.personal.connectedAccounts.description}</Text>
      </Flex>
      <ul
        className={css({
          gap: "space16",
          display: "flex",
          flexDirection: "column",
        })}
      >
        {user?.identities?.map((identity) => (
          <ConnectedAccount
            identity={identity}
            key={identity.id}
            onUnlink={() => getUser().then(setUser)}
            user={user}
          />
        ))}
      </ul>
    </Flex>
  );
};
