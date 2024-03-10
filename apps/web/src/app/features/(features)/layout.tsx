import { Box, Flex } from "@flows/styled-system/jsx";
import { DesktopSidebar } from "components/features/desktop-navbar";
import { MobileSidebar } from "components/features/mobile-navbar";
import { sidebarData } from "components/features/sidebar-content";

export default function FeaturesLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <Flex
      gap="space40"
      justifyContent="center"
      mdDown={{ flexDirection: "column", px: "0", pt: "0" }}
      pt="space64"
      px="space24"
    >
      <MobileSidebar data={sidebarData} />
      <DesktopSidebar data={sidebarData} />

      <Box maxWidth={720} mdDown={{ px: "space24" }}>
        {children}
      </Box>
    </Flex>
  );
}
