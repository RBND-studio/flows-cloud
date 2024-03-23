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
  title: "Deliver – Flows Features",
  description:
    "Flows are built in pursuit of high-performance. We’ve optimized every aspect of Flows to make sure your users get the best experience possible.",
};

export default function Page(): ReactElement {
  return (
    <>
      <FeatureHeader
        description="Flows are built in pursuit of high-performance. We’ve optimized every aspect of Flows to make sure your users get the best experience possible."
        title="Reliable flow delivery"
      />
      <Box borBottom="1px" mb="space40" pb="space40">
        <Text as="h2" className={Heading2styles} id="speed" variant="title2xl">
          Speed as a priority
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Your users won’t wait for the tour to load. That’s why Flows show instantly after the
          first load which takes ~300ms.
        </Text>
        <Image
          alt="Speed"
          className={ImageStyles}
          height={960}
          src="/images/features/speed.png"
          width={2160}
        />
        <Text as="h3" className={Heading3styles} variant="titleL">
          Async loading
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          On the first load, Flows load only the first step of the flows that the user can see. The
          rest of the steps are loaded only when the particular flow is started. This way, the
          initial load is super fast.
        </Text>
      </Box>
      <Box borBottom="1px" mb="space40" pb="space40">
        <Text as="h2" className={Heading2styles} id="size" variant="title2xl">
          Tiny size
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Size matters, especially when it comes to site performance. Flows’ script is incredibly
          lightweight, weighing in at just ~20kB, making it one of the most compact options
          available.
        </Text>
        <Image
          alt="Size"
          className={ImageStyles}
          height={960}
          src="/images/features/size.png"
          width={2160}
        />
        <Text as="h3" className={Heading3styles} variant="titleL">
          CDN hosted
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Flows script can also be loaded from a Content Delivery Network (CDN).
        </Text>
        <Text as="h3" className={Heading3styles} variant="titleL">
          Flows JS SDK
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Accelerate load times even further with the Flows JS SDK. Skip the script loading time and
          initialize Flows in a few milliseconds.
        </Text>
      </Box>
      <Box borBottom="1px" mb="space40" pb="space40">
        <Text as="h2" className={Heading2styles} id="frequency" variant="title2xl">
          Frequency
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Show flows once or every time the user matches the targeting conditions. Ensuring optimal
          engagement without overwhelming your audience.
        </Text>
        <Image
          alt="Frequency"
          className={ImageStyles}
          height={654}
          src="/images/features/frequency.png"
          width={2160}
        />
      </Box>
      <Box borBottom="1px" mb="space40" pb="space40">
        <Text as="h2" className={Heading2styles} id="targeting" variant="title2xl">
          Targeting
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Precision is key in user engagement. Segment your user base and display flows exclusively
          to those who stand to benefit, ensuring that the right message reaches the right audience
          at the right time.
        </Text>
        <Image
          alt="Targeting"
          className={ImageStyles}
          height={882}
          src="/images/features/targeting.png"
          width={2160}
        />
        <Text as="h3" className={Heading3styles} variant="titleL">
          Secure and private
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Your users data is none of our business. When segmenting users, we conduct user
          segmentation on the client side. This means we never send user data to our servers. We
          prioritize user privacy by requiring only the user ID for identification purposes.
        </Text>
      </Box>
      <Box borBottom="1px" mb="space40" pb="space40">
        <Text as="h2" className={Heading2styles} id="launch-action" variant="title2xl">
          Launch action
        </Text>
        <Text className={ParagraphStyles} color="muted" variant="bodyL">
          Timing is everything. Launch flows precisely when users visit a designated page or
          interact with a specific element, maximizing the impact of your onboarding efforts.
        </Text>
        <Image
          alt="Launch"
          className={ImageStyles}
          height={753}
          src="/images/features/launch.png"
          width={2160}
        />
      </Box>

      <FeatureSuggestions featureSectionTitle="Deliver" />
    </>
  );
}
