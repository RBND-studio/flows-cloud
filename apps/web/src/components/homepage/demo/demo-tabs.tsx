import { css, cva } from "@flows/styled-system/css";
import { Flex, Grid } from "@flows/styled-system/jsx";
import { type ReactElement } from "react";
import { Icon, Text } from "ui";

import { tabs } from "./demo-data";

type Props = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export const DemoTabs = ({ activeTab, onTabChange }: Props): ReactElement => {
  return (
    <Flex overflow="auto">
      {tabs.map((tab) => {
        const active = tab.title === activeTab;
        return (
          <Grid padding="space8" key={tab.title} flex="1" className={lineCss}>
            <button
              type="button"
              onClick={() => onTabChange(tab.title)}
              className={button({ active })}
            >
              <Icon icon={tab.icon} />
              <Text weight="600" color="muted" align="center">
                {tab.title}
              </Text>
            </button>
          </Grid>
        );
      })}
    </Flex>
  );
};

const button = cva({
  base: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: "space8",
    paddingY: "space16",
    paddingX: "space8",
    alignItems: "center",
    minWidth: "140px",
    justifyContent: "center",
    transitionTimingFunction: "easeInOut",
    transitionDuration: "fast",
    borderRadius: "radius8",
    _hover: {
      bg: "bg.hover",
    },
  },
  variants: {
    active: {
      true: {
        bg: "bg.subtle",
      },
    },
  },
});

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
