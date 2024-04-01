import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { api } from "lib/api";
import { load } from "lib/load";
import { cookies } from "next/headers";
import { createClient } from "supabase/server";
import { t } from "translations";
import { Text } from "ui";

import { ConnectedAccount, type ConnectedAccountUserIdentity } from "./connected-account";

export const ConnectedAccounts = async (): Promise<JSX.Element> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const supabaseUser = (await supabase.auth.getUser()).data.user;
  const me = await load(api["/me"]());

  const emailIdentity: ConnectedAccountUserIdentity = supabaseUser?.identities?.find(
    (identity) => identity.provider === "email",
  ) ?? {
    provider: "email",
    identity_data: { email: supabaseUser?.email },
    id: "email",
    identity_id: "email",
    user_id: supabaseUser?.id ?? "email",
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
          ? [
              emailIdentity,
              ...(supabaseUser.identities?.filter((i) => i.provider !== "email") ?? []),
            ].map((identity) => (
              <ConnectedAccount
                identity={identity}
                key={identity.id}
                user={supabaseUser}
                hasPassword={!!me.hasPassword}
              />
            ))
          : null}
      </ul>
    </Flex>
  );
};
