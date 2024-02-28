import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { getAuth } from "auth/server";
import { Sidebar } from "components/sidebar";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { routes } from "routes";

import { DashboardProviders } from "./dashboard-providers";

type Props = {
  children?: ReactNode;
};

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: Props): Promise<JSX.Element | null> {
  const auth = await getAuth();
  if (!auth) return redirect(routes.login());

  return (
    <DashboardProviders>
      <Flex height="100%" minHeight="100%" overflowX="hidden">
        <Sidebar />
        <div
          className={css({
            maxWidth: "1100px",
            flex: 1,
            mx: "auto",
            py: "space24",
            px: "space32",
            minHeight: "100%",
            overflowX: "hidden",
          })}
        >
          {children}
        </div>
      </Flex>
    </DashboardProviders>
  );
}
