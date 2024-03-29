"use client";

import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import type { User, UserIdentity } from "@supabase/supabase-js";
import { useFetch } from "hooks/use-fetch";
import { useFirstRender } from "hooks/use-first-render";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "supabase/client";
import { t } from "translations";
import { Text, toast } from "ui";

import { ConnectedAccount } from "./connected-account";

export const ConnectedAccounts = (): JSX.Element => {
  const supabase = createClient();
  const firstRender = useFirstRender();
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const { data: me } = useFetch("/me");

  const getUser = useCallback(async (): Promise<User | null> => {
    const {
      data: { user: userData },
    } = await supabase.auth.getUser();
    return userData;
  }, [supabase.auth]);

  useEffect(() => {
    if (!firstRender) return;
    getUser()
      .then(setSupabaseUser)
      .catch((e: Error) => toast.error(e.message));
  }, [firstRender, getUser]);

  const emailIdentity: UserIdentity = supabaseUser?.identities?.find(
    (identity) => identity.provider === "email",
  ) ?? {
    provider: "email",
    identity_data: { email: supabaseUser?.email },
    id: "email",
    identity_id: "email",
    user_id: supabaseUser?.id ?? "email",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_sign_in_at: new Date().toISOString(),
  };

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
        {supabaseUser
          ? [emailIdentity, ...(supabaseUser.identities ?? [])].map((identity) => (
              <ConnectedAccount
                identity={identity}
                key={identity.id}
                onUnlink={() =>
                  getUser()
                    .then(setSupabaseUser)
                    .catch((e: Error) => toast.error(e.message))
                }
                user={supabaseUser}
                hasPassword={!!me?.hasPassword}
              />
            ))
          : null}
      </ul>
    </Flex>
  );
};
