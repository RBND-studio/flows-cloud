import { Box, Flex } from "@flows/styled-system/jsx";
import { DesktopSidebar } from "components/features/desktop-sidebar";
import { MobileSidebar } from "components/features/mobile-sidebar";

//TODO: add option to copy anchor links to headings in feature pages

export default function FeaturesLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <Flex
      gap="space40"
      justifyContent="center"
      mdDown={{ flexDirection: "column", px: "0", pt: "0" }}
      pt="space64"
      px="space24"
    >
      <MobileSidebar />
      <DesktopSidebar />

      <Box maxWidth={720} mdDown={{ px: "space24" }}>
        {children}
      </Box>
    </Flex>
  );
}
