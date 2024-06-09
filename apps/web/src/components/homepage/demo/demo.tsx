import { css } from "@flows/styled-system/css";
import { Box } from "@flows/styled-system/jsx";
import { Section, SingleBoxLinesWrapper } from "components/ui";
import { type FC } from "react";

import { DemoTabs } from "./demo-tabs";

export const DemoSection: FC = () => {
  return (
    <Section
      innerClassName={css({
        display: "flex",
        flexDirection: "column",
      })}
      sectionPadding="none"
    >
      <DemoTabs />
      <SingleBoxLinesWrapper>
        <Box background="bg" width="100%" height="530" borderRadius="radius12" bor="1px" />
      </SingleBoxLinesWrapper>
    </Section>
  );
};
