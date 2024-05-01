import { css } from "@flows/styled-system/css";
import { Box } from "@flows/styled-system/jsx";
import { FaqAccordion, Section } from "components/ui";
import { type ReactElement } from "react";
import { formatNumberWithThousandSeparator, pricingTiers } from "shared";
import { Text } from "ui";

const questions = [
  {
    title: "How does the pricing work?",
    content:
      "Flows offers volume based pricing, the more flows you start the less you pay. Every month you will be billed based on the number of flows you started. To get an estimate of your monthly cost, use our pricing calculator above.",
  },
  {
    title: "Do you offer a free tier?",
    content: `Yes, we offer a free tier for the first ${formatNumberWithThousandSeparator(
      pricingTiers.free.flowsRange[1],
    )} flows started. No credit card required. When you exceed the free tier, you will need to upgrade to a pay as you go plan starting at $${
      pricingTiers.tier1.price
    } per flow.`,
  },
  {
    title: "Do you offer discounts for startups?",
    content: (
      <>
        Yes, we offer discounts for startups. Please reach out to us at{" "}
        <a
          className={css({
            color: "text.primary",
            textDecoration: "underline",
          })}
          href="mailto:hello@flows.sh"
        >
          hello@flows.sh
        </a>
      </>
    ),
  },
  {
    title: "How does Flows calculate usage?",
    content:
      "Flows calculates usage based on the number of flows you start. A flow is counted when a user starts an onboarding flow.",
  },
  {
    title: "Will you help us switch to Flows?",
    content:
      "We will. We're happy to assist you with moving your existing onboarding to Flows. When transitioning to Flows from another tool, we offer free usage to cover the transition period and avoid double billing.",
  },
];

export const PricingFaq = (): ReactElement => {
  return (
    <Section
      sectionPadding="small"
      innerClassName={css({
        maxWidth: "640px!",
      })}
    >
      <Text
        className={css({
          marginBottom: "space24",
        })}
        variant="title2xl"
        align="center"
      >
        FAQs
      </Text>

      <Box>
        {questions.map((item) => (
          <FaqAccordion key={item.title} title={item.title}>
            <Text color="muted" variant="bodyL">
              {item.content}
            </Text>
          </FaqAccordion>
        ))}
      </Box>
    </Section>
  );
};
