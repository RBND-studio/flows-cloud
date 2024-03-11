import { Box } from "@flows/styled-system/jsx";
import {
  FeatureHeader,
  FeatureSuggestions,
  Heading2styles,
  ImageStyles,
  ParagraphStyles,
} from "components/features";
import type { Metadata } from "next";
import Image from "next/image";
import type { ReactElement } from "react";
import { Text } from "ui";

export const metadata: Metadata = {
  title: "Analyze – Flows Features",
  description:
    "Building truly great user onboarding is part intuition and part data. To help with the data part, Flows offer tools to help you understand how users are interacting with your tours.",
};

export default function Page(): ReactElement {
  return (
    <>
      <FeatureHeader
        description="Building truly great user onboarding is part intuition and part data. To help with the data part, Flows offer tools to help you understand how users are interacting with your tours."
        title="Analyze, optimize, fix"
      />
      <Box borBottom="1px" mb="space40" pb="space40">
        <Text className={Heading2styles} id="flow-insights" variant="title2xl">
          Flows insights
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Understand how users are interacting with your flows. See where they drop off, where they
          get stuck, and where they succeed.
        </Text>
        <Image
          alt="Analytics"
          className={ImageStyles}
          height={1371}
          src="/images/features/analytics.png"
          width={2160}
        />
      </Box>
      <Box borBottom="1px" mb="space40" pb="space40">
        <Text className={Heading2styles} id="error-tracking" variant="title2xl">
          Error tracking
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Spot issues in your flows and fix them. Track instances where tooltips fail to show up and
          uncover the root causes behind these issues.
        </Text>
      </Box>
      <Box borBottom="1px" mb="space40" pb="space40">
        <Text className={Heading2styles} id="analytics-integration" variant="title2xl">
          Analytics integration
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Prefer leveraging your existing analytics tools? No worries. Flows seamlessly integrates
          with your frontend analytics platform of choice. With just a few lines of code, you can
          sync Flows with your analytics toolkit, ensuring a smooth workflow and data analysis.
        </Text>
      </Box>

      <FeatureSuggestions featureSectionTitle="Analyze" />
    </>
  );
}
