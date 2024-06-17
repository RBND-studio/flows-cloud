"use client";

import { css } from "@flows/styled-system/css";
import { Box } from "@flows/styled-system/jsx";
import { ThemeImage } from "components/theme-image";
import { Section, SingleBoxLinesWrapper } from "components/ui";
import { type FC, useState } from "react";

import { tabs } from "./demo-data";
import { DemoTabs } from "./demo-tabs";

export const DemoSection: FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].title);

  return (
    <Section
      innerClassName={css({
        display: "flex",
        flexDirection: "column",
      })}
      sectionPadding="none"
    >
      <DemoTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <SingleBoxLinesWrapper>
        <Box
          background="bg"
          width="100%"
          max-height="530"
          borderRadius="radius12"
          bor="1px"
          overflow="hidden"
        >
          {tabs.map((tab) => {
            const active = activeTab === tab.title;
            return (
              <Box key={tab.title} display={active ? "block" : "none"}>
                <ThemeImage
                  fetchPriority={active ? "high" : undefined}
                  srcDark={tab.imgDark}
                  srcLight={tab.imgLight}
                  alt={tab.title}
                  width={2844}
                  height={1605}
                />
              </Box>
            );
          })}
        </Box>
      </SingleBoxLinesWrapper>
    </Section>
  );
};
