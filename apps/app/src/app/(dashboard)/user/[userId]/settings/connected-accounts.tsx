"use client";

import { css } from "@flows/styled-system/css";
import type { User } from "@supabase/supabase-js";
import { useFirstRender } from "hooks/use-first-render";
import React, { useCallback, useEffect, useState } from "react";
import { createClient } from "supabase/client";
import { toast } from "ui";

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
      <ul
        className={css({
          gap: "space16",
          display: "flex",
          flexDirection: "column",
        })}
      >
        {user?.identities
          ?.filter((i) => i.provider !== "email")
          ?.map((identity) => (
            <ConnectedAccount
              identity={identity}
              key={identity.id}
              onUnlink={() => getUser().then(setUser)}
              user={user}
            />
          ))}
      </ul>
    </div>
  );
};
