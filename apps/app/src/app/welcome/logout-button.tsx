"use client";

import { css } from "@flows/styled-system/css";
import { useAuth } from "auth/client";
import type { FC } from "react";
import { t } from "translations";
import { Button } from "ui";

export const LogoutButton: FC = () => {
  const { logout, processingLogout } = useAuth();

  return (
    <Button
      className={css({ position: "absolute", top: "space24", right: "space24" })}
      loading={processingLogout}
      onClick={logout}
      variant="secondary"
    >
      {t.actions.logout}
    </Button>
  );
};
