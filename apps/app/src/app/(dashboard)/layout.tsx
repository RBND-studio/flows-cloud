import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { Sidebar } from "components/sidebar";
import type { ReactNode } from "react";

import { DashboardProviders } from "./dashboard-providers";

type Props = {
  children?: ReactNode;
};

export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }: Props): JSX.Element {
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
