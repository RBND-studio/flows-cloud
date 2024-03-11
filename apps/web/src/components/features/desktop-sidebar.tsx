import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import Link from "next/link";
import { Fragment } from "react";
import { Icon, Text } from "ui";

import type { SidebarData } from "./sidebar-content";

export const DesktopSidebar = ({ data }: { data: SidebarData }): JSX.Element => {
  return (
    <Flex
      flexDirection="column"
      height="calc(100vh - 120px)"
      maxWidth={200}
      mb="space40"
      mdDown={{ display: "none" }}
      overflowY="auto"
      position="sticky"
      top="120px"
      width="100%"
    >
      {data.map((section) => (
        <Fragment key={section.title}>
          <Text className={css({ mb: "space16" })} variant="titleM">
            {section.title}
          </Text>
          <Flex flexDirection="column" gap="space8" mb="space24">
            {section.features.map((feature) => (
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
                    fastEaseInOut="bg"
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
          </Flex>
        </Fragment>
      ))}
    </Flex>
  );
};
