import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import Link from "next/link";
import { Icon, Text } from "ui";

import { sidebarData } from "./sidebar-content";

export const MobileSidebar = (): JSX.Element => {
  return (
    <Flex
      backgroundColor="bg.muted"
      borBottom="1px"
      display="none"
      gap="space32"
      mdDown={{ display: "flex" }}
      overflow="auto"
      pt="space16"
      px="space24"
      width="100%"
    >
      {sidebarData.map((section) => (
        <Flex flexDirection="column" key={section.title}>
          <Text className={css({ mb: "space4", textWrap: "nowrap" })} variant="titleM">
            {section.title}
          </Text>
          <Flex gap="space24" mb="space16">
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
                  <Text className={css({ textWrap: "nowrap" })} color="inherit" variant="bodyS">
                    {feature.title}
                  </Text>
                </Flex>
              </Link>
            ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
