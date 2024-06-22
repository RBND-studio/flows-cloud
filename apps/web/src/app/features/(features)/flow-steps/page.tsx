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

import { metadata as featuresLayoutMetadata } from "../../layout";
import modalImage from "./modal.png";
import tooltipImage from "./tooltip.png";
import waitImage from "./wait.png";

export const metadata: Metadata = {
  title: "Flow Steps – Flows Features",
  description:
    "Great onboarding needs powerful step types. With Flows we are reinventing the way you can guide users through your product. Wait for user input or branch based on their actions to create a truly personalized experience.",
  openGraph: {
    ...featuresLayoutMetadata.openGraph,
    title: "Flow Steps – Flows Features",
    description:
      "Great onboarding needs powerful step types. With Flows we are reinventing the way you can guide users through your product. Wait for user input or branch based on their actions to create a truly personalized experience.",
  },
  twitter: {
    ...featuresLayoutMetadata.twitter,
    title: "Flow Steps – Flows Features",
    description:
      "Great onboarding needs powerful step types. With Flows we are reinventing the way you can guide users through your product. Wait for user input or branch based on their actions to create a truly personalized experience.",
  },
};

export default function Page(): ReactElement {
  return (
    <>
      <FeatureHeader
        description="Great onboarding needs powerful step types. With Flows we are reinventing the way you can guide users through your product. Wait for user input or branch based on their actions to create a truly personalized experience."
        title="More than just tooltips and modals"
      />
      <Box borBottom="1px" mb="space40" pb="space40">
        <Text as="h2" className={Heading2styles} id="tooltip" variant="title2xl">
          Tooltip
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Tooltips are the most basic step type. Use them to point to elements on a page and guide
          users through your product.
        </Text>
        <Image
          alt="Tooltip"
          className={ImageStyles}
          src={tooltipImage}
          sizes="(max-width: 768px) 100vw, 750px"
        />
        <Text as="h3" className={Heading3styles} variant="titleL">
          Wait for user input
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Sometimes you need to wait for user input before moving on. Whether it’s clicking a
          button, completing a form, or any other action, you can wait for it.
        </Text>
      </Box>
      <Box borBottom="1px" mb="space40" pb="space40">
        <Text as="h2" className={Heading2styles} id="modal" variant="title2xl">
          Modal
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Following tooltips, modals serve as a an improtant step type, ideal for presenting
          comprehensive information or capturing user attention with larger visual elements.
        </Text>
        <Image
          alt="Modal"
          className={ImageStyles}
          src={modalImage}
          sizes="(max-width: 768px) 100vw, 750px"
        />
        <Text as="h3" className={Heading3styles} variant="titleL">
          Custom HTML content
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          When text alone isn’t enough, write your own HTML to create anything you imagine. Custom
          HTML is supported in tooltips too.
        </Text>
      </Box>
      <Box borBottom="1px" mb="space40" pb="space40">
        <Text as="h2" className={Heading2styles} id="wait" variant="title2xl">
          Wait
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Sometimes you need to wait for the user to complete an action. Use the wait step type to
          give users time to complete an action before moving on.
        </Text>
        <Image
          alt="Wait"
          className={ImageStyles}
          src={waitImage}
          sizes="(max-width: 768px) 100vw, 750px"
        />
        <Text as="h3" className={Heading3styles} variant="titleL">
          Wait for click
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          You can wait for the user to click a specific element on the page or even on a specific
          page where they will navigate to.
        </Text>
        <Text as="h3" className={Heading3styles} variant="titleL">
          Wait for element
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Wait for an element to appear on the page before moving on.
        </Text>
        <Text as="h3" className={Heading3styles} variant="titleL">
          Wait for input change
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Wait for the user to change an input value. Optionally you can also check if the value
          matches a specific pattern and branch out the flow based on that.
        </Text>
        <Text as="h3" className={Heading3styles} variant="titleL">
          Wait for form submit
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Wait for the user to submit a form. If needed you can check the form values and branch out
          the flow.
        </Text>
      </Box>
      <Box borBottom="1px" mb="space40" pb="space40">
        <Text as="h2" className={Heading2styles} id="branch" variant="title2xl">
          Branch
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Create personalized experiences by branching out the flow based on user input or actions.
          No need to create multiple flows for different user segments. Branch out and then merge
          back into the main flow as you need.
        </Text>
        <Text as="h3" className={Heading3styles} variant="titleL">
          Branch out from any step
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          All steps support branching out. From adding branching buttons to tooltips or modals to
          waiting for specific user inputs, Flows empowers you to create dynamic, personalized
          experiences that resonate with your users.
        </Text>
      </Box>

      <FeatureSuggestions featureSectionTitle="Flow steps" />
    </>
  );
}
