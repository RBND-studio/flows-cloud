import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { bulletCss, headingCss, paragraphCss, Section } from "components/ui";
import type { ReactElement } from "react";
import { links } from "shared";
import { Text } from "ui";

const Page = (): ReactElement => {
  return (
    <>
      <Section
        innerClassName={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "space24",
        })}
        outerClassName={css({
          backgroundImage: "radial-gradient(token(colors.special.dotBg) 1px, transparent 0)",
          backgroundSize: "16px 16px",
        })}
      >
        <Flex flexDirection="column" gap="space12" maxW="800px">
          <Text align="center" as="h1" variant="title4xl">
            Flows privacy policy
          </Text>
        </Flex>
      </Section>
      <Section
        innerClassName={css({
          maxWidth: "580px!",
        })}
      >
        <Text className={paragraphCss} variant="bodyM">
          At Flows, we take your privacy seriously. Please read this Privacy Policy to learn how we
          treat your personal data. By using or accessing our Services in any manner, you
          acknowledge that you accept the practices and policies outlined below, and you hereby
          consent that we will collect, use and share your information as described in this Privacy
          Policy.
        </Text>
        <Text as="h2" className={headingCss} variant="titleXl">
          What this Privacy Policy Covers
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          This Privacy Policy covers how we treat Personal Data that we gather when you access or
          use our Services. “Personal Data” means any information that identifies or relates to a
          particular individual and also includes information referred to as “personally
          identifiable information” or “personal information” under applicable data privacy laws,
          rules or regulations. This Privacy Policy does not cover the practices of companies we
          don’t own or control or people we don’t manage.
        </Text>
        <Text as="h2" className={headingCss} variant="titleXl">
          As a visitor to flows.sh website
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          The privacy of our website visitors is important to us so we do not track any individual
          people.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          We use{" "}
          <a href="https://plausible.io/" rel="noopener noreferrer" target="_blank">
            Plausible Analytics
          </a>{" "}
          to collect anonymous usage data for statistical purposes. The goal is to track overall
          trends not individual visitors. All the data is in aggregate only, no personal data is
          collected. Data collected includes referral sources, top pages, visit duration,
          information from the devices (device type, operating system, country and browser) used
          during the visit and more. You can see the full details in the{" "}
          <a href="https://plausible.io/data-policy" rel="noopener noreferrer" target="_blank">
            Plausible data policy
          </a>
          .
        </Text>
        <Text as="h2" className={headingCss} variant="titleXl">
          As a user of Flows Cloud (app.flows.sh)
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          Our guiding principle is to collect only what we need and that we will solely process this
          information to provide you with the service you signed up for. For that we collect:
        </Text>

        <ul>
          <li className={bulletCss}>First and last name (if provided)</li>
          <li className={bulletCss}>Email</li>
          <li className={bulletCss}>Password</li>
        </ul>

        <Text className={paragraphCss} variant="bodyM">
          We use a select number of trusted third parties to help us provide the service. We only
          share information with them that is required for the services they provide.
        </Text>
        <Text as="h2" className={headingCss} variant="titleXl">
          Sharing your information
        </Text>

        <Text className={paragraphCss} variant="bodyM">
          We use Posthog to collect usage data for the Flows Cloud. We use this data to improve the
          product and provide better support. See the{" "}
          <a href="https://posthog.com/privacy" rel="noopener noreferrer" target="_blank">
            Posthog privacy policy
          </a>{" "}
          for full details.
        </Text>

        <Text className={paragraphCss} variant="bodyM">
          We use Loops.io to send all our emails. Transactional email and marketing emails. We have
          disabled link tracking and Loops only tracks open rates. See the{" "}
          <a href="https://loops.so/privacy" rel="noopener noreferrer" target="_blank">
            Loops.io privacy policy
          </a>{" "}
          for full details.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          We use DigitalOcean to host our applications and databases. See the{" "}
          <a
            href="https://www.digitalocean.com/legal/privacy-policy"
            rel="noopener noreferrer"
            target="_blank"
          >
            DigitalOcean privacy policy
          </a>{" "}
          for full details.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          We use Cloudflare for a global CDN, DNS, DDoS, and Captcha protection. See the details in
          the{" "}
          <a
            href="https://www.cloudflare.com/privacypolicy/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Cloudflare privacy policy
          </a>{" "}
          for full details.
        </Text>
        <Text as="h2" className={headingCss} variant="titleXl">
          Retention of data
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          We will retain your information as long as your account is active, as necessary to provide
          you with the services or as otherwise set forth in this policy.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          We will also retain and use this information as necessary for the purposes set out in this
          policy and to the extent necessary to comply with our legal obligations, resolve disputes,
          enforce our agreements and protect our legal rights.
        </Text>

        <Text as="h2" className={headingCss} variant="titleXl">
          Changes and questions
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          We may update this policy as needed to comply with relevant regulations and reflect any
          new practices. Whenever we make a significant change to our policies, we will alert you to
          any such changes by placing a notice on the Flows website, by sending you an email and/or
          by some other means.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          Contact us at <a href={links.support}>hello@flows.sh</a> if you have any questions,
          comments, or concerns about this privacy policy, your data, or your rights with respect to
          your information.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          Last updated: March 6, 2024
        </Text>
      </Section>
    </>
  );
};

export default Page;
