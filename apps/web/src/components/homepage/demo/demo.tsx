"use client";

import { css } from "@flows/styled-system/css";
import { Box } from "@flows/styled-system/jsx";
import { Section, SingleBoxLinesWrapper } from "components/ui";
import Image from "next/image";
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
          {tabs.map((tab) => (
            <Box key={tab.title} display={activeTab === tab.title ? "block" : "none"}>
              <Image src={tab.img} alt={tab.title} width={2844} height={1605} priority />
            </Box>
          ))}
        </Box>
      </SingleBoxLinesWrapper>
    </Section>
  );
};
