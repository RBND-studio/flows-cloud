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
  title: "Modern and Secure – Flows Features",
  description:
    "Flows are built with privacy in mind. We don’t track your users, store any of their personal data, and we use only one functional cookie.",
};

export default function Page(): ReactElement {
  return (
    <>
      <FeatureHeader
        description="Flows are built with privacy in mind. We don’t track your users, store any of their personal data, and we use only one functional cookie."
        title="Safe, secure, and private"
      />
      <Box borBottom="1px" mb="space40" pb="space40">
        <Text as="h2" className={Heading2styles} id="privacy-first" variant="title2xl">
          Privacy first
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Your users’ privacy is important. That’s why Flows don’t store any personal data about
          your users. When segmenting users the evaluation is done on the client side. This means
          that the user data is never sent to our servers.
        </Text>
        <Image
          alt="Privacy"
          className={ImageStyles}
          height={720}
          src="/images/features/privacy.png"
          width={2160}
        />
        <Text as="h3" className={Heading3styles} variant="titleL">
          Identify users semi-anonymously
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          When setting up a flow that should only appear once per user, we need to identify each
          user. To do that you need to provide us with a user identifier (like a user ID), which we
          hash on the client side before sending it to our servers. This method allows us to
          identify the user without knowing their identity and it is the only data we store about
          your users.
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          If you choose not to provide us with a user identifier, you will need to manage the
          frequency of how often flows show up yourself. In this case, Flows won’t store any data
          about your users.
        </Text>
        <Text as="h3" className={Heading3styles} variant="titleL">
          Client side user segmentation
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          To ensure the safety of your users’ data, we conduct user segmentation on the client side.
          This means we never send user data to our servers.
        </Text>
      </Box>

      <FeatureSuggestions featureSectionTitle="Modern and secure" />
    </>
  );
}
