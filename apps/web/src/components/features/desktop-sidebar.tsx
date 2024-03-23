import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import Link from "next/link";
import { Icon, Text } from "ui";

import { DesktopSidebarSection } from "./desktop-sidebar-section";
import { sidebarData } from "./sidebar-content";

export const DesktopSidebar = (): JSX.Element => {
  return (
    <Flex
      flexDirection="column"
      height="calc(100vh - 121px)"
      maxWidth={200}
      mb="space40"
      mdDown={{ display: "none" }}
      overflowY="auto"
      position="sticky"
      top="121px"
      width="100%"
    >
      {sidebarData.map((section) => (
        <DesktopSidebarSection
          items={section.features.map((feature) => (
            <Link
              className={css({
                fastEaseInOut: "color",
                color: "text.muted",
                _hover: {
                  color: "text",
                  "& > div > div": {
                    bg: "bg.hover",
                  },
                },
              })}
              href={feature.link}
              key={feature.title}
            >
              <Flex alignItems="center" gap="space8">
                <Flex
                  bg="bg.muted"
                  bor="1px"
                  borderRadius="radius8"
                  fastEaseInOut="background"
                  padding="6px"
                >
                  <Icon icon={feature.icon} />
                </Flex>
                <Text color="inherit" variant="bodyS">
                  {feature.title}
                </Text>
              </Flex>
            </Link>
          ))}
          key={section.title}
          link={section.link}
          title={section.title}
        />
      ))}
    </Flex>
  );
};
