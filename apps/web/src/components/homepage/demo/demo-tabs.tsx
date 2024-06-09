import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { Flows16 } from "icons";
import { type ReactElement } from "react";
import { Icon, Text } from "ui";

const tabs = [
  {
    icon: Flows16,
    title: "User onboarding",
  },
  {
    icon: Flows16,
    title: "Feature adoption",
  },
  {
    icon: Flows16,
    title: "Announcements",
  },
  {
    icon: Flows16,
    title: "Tooltips",
  },
  {
    icon: Flows16,
    title: "Checklists",
  },
];

const lineCss = css({
  position: "relative",

  _after: {
    content: '""',
    position: "absolute",
    bottom: "0px",
    width: "1px",
    right: "1px",
    height: "120px",
    background: "linear-gradient(180deg, transparent, {colors.border})",
  },

  _last: {
    _after: {
      background: "none",
    },
  },
});

export const DemoTabs = (): ReactElement => {
  return (
    <Flex overflow="auto">
      {tabs.map((tab) => (
        <Flex padding="space8" key={tab.title} flex="1" className={lineCss}>
          <Flex
            flexDirection="column"
            gap="space8"
            paddingY="space16"
            paddingX="space24"
            alignItems="center"
            width="100%"
          >
            <Icon icon={tab.icon} />
            <Text weight="600" color="muted">
              {tab.title}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
