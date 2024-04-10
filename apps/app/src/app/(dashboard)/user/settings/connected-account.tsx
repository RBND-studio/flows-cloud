"use client";
import { css } from "@flows/styled-system/css";
import type { User, UserIdentity } from "@supabase/supabase-js";
import { useSend } from "hooks/use-send";
import { GitHub16, Google16, Mail16 } from "icons";
import { api } from "lib/api";
import { useRouter } from "next/navigation";
import { t } from "translations";
import { Button, Text, Tooltip } from "ui";

import { PasswordChangeDialog } from "./password-change-dialog";

export type ConnectedAccountUserIdentity = Omit<
  UserIdentity,
  "created_at" | "updated_at" | "last_sign_in_at"
>;

type ConnectedAccountProps = {
  user: User;
  identity: ConnectedAccountUserIdentity;
  hasPassword: boolean;
};

export const ConnectedAccount = ({
  identity,
  user,
  hasPassword,
}: ConnectedAccountProps): JSX.Element => {
  const { send, loading, error } = useSend();
  const router = useRouter();
  const handleUnlink = async (): Promise<void> => {
    await send(api["DELETE /me/identities/:providerId"](identity.id), {
      errorMessage: t.toasts.accountUnlinkFailed,
    });
    if (!error) router.refresh();
  };

  const isDisabled = !hasPassword && user.identities?.length === 1;
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
      <Text
        className={css({
          mr: "auto",
        })}
      >
        {identity.identity_data?.email}
      </Text>
      {identity.provider !== "email" ? (
        <Tooltip
          text={isDisabled ? t.personal.connectedAccounts.lastProvider : ""}
          trigger={
            <div>
              <Button
                disabled={isDisabled}
                loading={loading}
                onClick={handleUnlink}
                size="small"
                variant="danger"
              >
                {t.actions.unlink}
              </Button>
            </div>
          }
        />
      ) : (
        <PasswordChangeDialog hasPassword={hasPassword} />
      )}
    </li>
  );
};
