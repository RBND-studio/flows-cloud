"use client";

import { css } from "@flows/styled-system/css";
import { useAuth } from "auth/client";
import Link from "next/link";
import type { FC } from "react";
import { routes } from "routes";
import { t } from "translations";
import { Button } from "ui";

export const TopRightButtons: FC = () => {
  const { auth, logout, processingLogout } = useAuth();

  return (
    <div
      className={css({
        position: "absolute",
        top: "space24",
        right: "space24",
        display: "flex",
        gap: "space8",
      })}
    >
      <Button asChild disabled={!auth?.user.id} variant="secondary">
        <Link href={routes.userSettings({ userId: auth?.user.id ?? "" })}>
          {t.settings.personal}
        </Link>
      </Button>
      <Button loading={processingLogout} onClick={logout} variant="secondary">
        {t.actions.logout}
      </Button>
    </div>
  );
};
