import { Box } from "@flows/styled-system/jsx";
import {
  FeatureHeader,
  FeatureSuggestions,
  Heading2styles,
  Heading3styles,
  ImageStyles,
  ParagraphStyles,
} from "components/features";
import type { Metadata } from "next";
import Image from "next/image";
import type { ReactElement } from "react";
import { Text } from "ui";

export const metadata: Metadata = {
  title: "Build – Flows Features",
  description:
    "Flows is the tool to build advanced user onboarding. Powerful yet simple to use, it allows you to work how you want. Without clunky limitations or bottlenecks.",
};

export default function Page(): ReactElement {
  return (
    <>
      <FeatureHeader
        description="Flows is the tool to build advanced user onboarding. Powerful yet simple to use, it allows you to work how you want. Without clunky limitations or bottlenecks."
        title="Powerful tool for onboarding"
      />
      <Box borBottom="1px" mb="space40" pb="space40">
        <Text as="h2" className={Heading2styles} id="no-code" variant="title2xl">
          No-code
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Create onboarding flows without needing to write code or involve developers. Flows Cloud
          is designed to allow for quick iteration and publishing of flows.
        </Text>
        <Image
          alt="No-code"
          className={ImageStyles}
          height={1317}
          src="/images/features/no-code.png"
          width={2160}
        />
        <Text as="h3" className={Heading3styles} variant="titleL">
          Steps editor
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Build out your flows step by step using the steps editor.
        </Text>
      </Box>
      <Box borBottom="1px" mb="space40" pb="space40">
        <Text as="h2" className={Heading2styles} id="in-code" variant="title2xl">
          In-code
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          To give you the flexibility to build out your flows exactly how you want, we also offer an
          in-code solution. This allows you to build out your flows inside your codebase and have
          full control over the experience.
        </Text>
        <Image
          alt="In-code"
          className={ImageStyles}
          height={1251}
          src="/images/features/in-code.png"
          width={2160}
        />
        <Text as="h3" className={Heading3styles} variant="titleL">
          Flows JS SDK
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Like everything in Flows, the JS SDK is designed to be flexible. Create flows, launch
          them, and track user progress all from your codebase.
        </Text>
      </Box>
      <Box borBottom="1px" mb="space40" pb="space40">
        <Text as="h2" className={Heading2styles} id="preview" variant="title2xl">
          Preview
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Test your flows before you ship them to your users. This allows you to see exactly how
          your flows will look and behave before you publish them.
        </Text>
        <Image
          alt="Preview"
          className={ImageStyles}
          height={630}
          src="/images/features/preview.png"
          width={2160}
        />
      </Box>

      <FeatureSuggestions featureSectionTitle="Build" />
    </>
  );
}
