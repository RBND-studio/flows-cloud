import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { headingCss, paragraphCss, Section } from "components/ui";
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
            Flows terms of service
          </Text>
        </Flex>
      </Section>
      <Section
        innerClassName={css({
          maxWidth: "580px!",
        })}
      >
        <Text className={paragraphCss} variant="bodyM">
          Thank you for using Flows!
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          When we say ”company”, “we”, “our”, “us”, ”service” or ”services” in this document, we are
          referring to Flows.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          We may update these Terms of Service in the future. Whenever we make a significant change
          to our policies, we will also announce them to you via the email address on record.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          When you use our service, now or in the future, you are agreeing to the latest Terms of
          Service. That’s true for any of our existing and future products and all features that we
          add to our service over time. There may be times where we do not exercise or enforce any
          right or provision of the Terms of Service; in doing so, we are not waiving that right or
          provision. These terms do contain a limitation of our liability.
        </Text>
        <Text as="h2" className={headingCss} variant="titleXl">
          Account terms
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          You are responsible for maintaining the security of your account and password. Flows
          cannot and will not be liable for any loss or damage from your failure to comply with this
          security obligation.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          You are responsible for any activity that occurs under your account (even by others who
          have their own logins under your account).
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          You may not use our service for any illegal purpose or to violate any laws in your
          jurisdiction.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          You must provide your legal full name and a valid email address in order to complete the
          sign up process.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          You must be a human. Accounts registered by bots or other automated methods are not
          permitted.
        </Text>
        <Text as="h2" className={headingCss} variant="titleXl">
          Cancellation and termination
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          You are solely responsible for properly canceling your account. An email to cancel your
          account is not considered cancellation. We provide a simple no-questions-asked
          cancellation link.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          We reserve the right to suspend or terminate your account and refuse any and all current
          or future use of the service for any reason at any time. Such termination of the service
          will result in the deactivation or deletion of your account or your access to your
          account. Flows reserves the right to refuse service to anyone for any reason at any time.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          Verbal, physical, written or other abuse (including threats of abuse or retribution) of
          any service customer, company employee or officer may result in immediate account
          termination.
        </Text>
        <Text as="h2" className={headingCss} variant="titleXl">
          Modifications to the service and prices
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          We reserve the right at any time and from time to time to modify or discontinue,
          temporarily or permanently, any part of the service with or without notice.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          Sometimes we change the pricing structure for our products. When we do that, we tend to
          exempt existing customers from those changes. However, we may choose to change the prices
          for existing customers. If we do so, we will give at least 30 days notice and will notify
          you via the email address on record. We may also post a notice about changes on our blog
          or the affected services themselves.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          Flows shall not be liable to you or to any third-party for any modification, price change,
          suspension or discontinuance of the service.
        </Text>
        <Text as="h2" className={headingCss} variant="titleXl">
          Content ownership, copyright and trademark
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          You are solely responsible for any content and other material that you submit, publish,
          transmit, email, or display on, through, or with the service.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          We claim no intellectual property rights over the material you provide to the service. All
          data remains yours.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          You may provide us with feedback, suggestions, and ideas about the service. You agree that
          we own all rights to use and incorporate the feedback you provide in any way, including in
          future enhancements and modifications to the service, without payment or attribution to
          you.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          You must not modify another website so as to falsely imply that it is associated with
          Flows. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of
          the service, use of the service, or access to the service without the express written
          permission by the company.
        </Text>
        <Text as="h2" className={headingCss} variant="titleXl">
          Privacy and security of your data
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          We take many measures to protect and secure your data through backups, redundancies, and
          encryption.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          Each party agrees to handle the other party’s data in accordance with (i) all applicable
          laws; and (ii) privacy and security measures reasonably adequate to preserve the other
          party data’s confidentiality and security.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          You agree to comply with all applicable laws including all privacy and data protection
          regulations.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          You agree not to use the service to send sensitive information to the company where
          unauthorized disclosure could cause material, severe, or catastrophic harm or impact to
          the company, any data subjects or third-parties. Sensitive information includes, but is
          not limited to credit card information, passport numbers, government issued identification
          numbers, financial account information, real time geolocation and personally identifiable
          information (PII). PII is information that could be used on its own to directly identify,
          contact, or precisely locate an individual.
        </Text>
        <Text as="h2" className={headingCss} variant="titleXl">
          General conditions
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          Your use of Flows is at your sole risk. The service is provided on an “as is” and “as
          available” basis. We do take uptime of our application seriously.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          We design our services with care, based on our own experience and the experiences of
          customers who share their time and feedback. However, there is no such thing as a service
          that pleases everybody. We make no guarantees that our services will meet your specific
          requirements or expectations.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          We also test all of our features extensively before shipping them. As with any software,
          our services inevitably have some bugs. We track the bugs reported to us and work through
          priority ones, especially any related to security or privacy. Not all reported bugs will
          get fixed and we don’t guarantee completely error-free services.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          Technical support is provided by email. Email responses are provided on the reasonable
          effort basis without guaranteed response time.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          We as humans can access your data to help you with support requests you make and to
          maintain and safeguard Flows to ensure the security of your data and the service as a
          whole.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          We use third party vendors to provide the necessary hardware, storage, payment processing
          and related technology required to run the Services. You can see a list of{" "}
          <a href="https://flows.sh/privacy" rel="noopener" target="_blank">
            all subprocessors here
          </a>
          .
        </Text>
        <Text as="h2" className={headingCss} variant="titleXl">
          Liability
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          We mention liability throughout these Terms but to put it all in one section:
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          You expressly understand and agree that Flows shall not be liable, in law or in equity, to
          you or to any third party for any direct, indirect, incidental, lost profits, special,
          consequential, punitive or exemplary damages, including, but not limited to, damages for
          loss of profits, goodwill, use, data or other intangible losses (even if the company has
          been advised of the possibility of such damages), resulting from: (i) the use or the
          inability to use the services; (ii) the cost of procurement of substitute goods and
          services resulting from any goods, data, information or services purchased or obtained or
          messages received or transactions entered into through or from the services; (iii)
          unauthorized access to or alteration of your transmissions or data; (iv) statements or
          conduct of any third party on the service; (v) or any other matter relating to this Terms
          of Service or the services, whether as a breach of contract, tort (including negligence
          whether active or passive), or any other theory of liability.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          In other words: choosing to use our services does mean you are making a bet on us. If the
          bet does not work out, that’s on you, not us. We do our darnedest to be as safe a bet as
          possible through careful management of the business; investments in security,
          infrastructure, and talent; and in general giving a damn. If you choose to use our
          services, thank you for betting on us.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          This agreement shall be governed by the laws of Czech Republic, and the courts of Czech
          Republic shall have exclusive jurisdiction to hear and determine all issues that may arise
          under or in relation to this agreement.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          Any ambiguities in the interpretation of these Terms of Service shall not be construed
          against the drafting party.
        </Text>
        <Text as="h2" className={headingCss} variant="titleXl">
          Contact us
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          If you have a question about any of the Terms of Service, please contact us by e-mail at{" "}
          <a href={links.support}>hello@flows.sh</a>.
        </Text>
        <Text className={paragraphCss} variant="bodyM">
          Last updated: March 6, 2024
        </Text>
      </Section>
    </>
  );
};

export default Page;
