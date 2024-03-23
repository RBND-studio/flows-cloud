import { css } from "@flows/styled-system/css";
import type { FeatureGridTypes } from "components/feature-grid";
import {
  Alert16,
  Cloud16,
  Code16,
  Comment16,
  Eye16,
  Filter16,
  Flows16,
  Fork16,
  Graph16,
  Hourglass16,
  Send16,
  ShieldLock16,
  Stack16,
  Storage16,
  Versions16,
} from "icons";

export const featuresData: FeatureGridTypes[] = [
  {
    title: "Build",
    description:
      "Flows is the tool to build advanced user onboarding. Powerful yet simple to use, it allows you to work how you want. Without clunky limitations or bottlenecks.",
    features: [
      {
        mainSlot: (
          <>
            <span>No-code.</span> Build and deploy in minutes.
          </>
        ),
        link: "/features/build#no-code",
        icon: Cloud16,
      },
      {
        mainSlot: (
          <>
            <span>In-code.</span> Stabilize flows and avoid bottlenecks.
          </>
        ),
        link: "/features/build#in-code",
        icon: Code16,
      },
      {
        mainSlot: (
          <>
            <span>Preview.</span> Test flows before you ship.
          </>
        ),
        link: "/features/build#preview",
        icon: Eye16,
      },
    ],
  },
  {
    title: "Flow steps",
    description:
      "Great onboarding needs powerful step types. With Flows we are reinventing the way you can guide users through your product. Wait for user input or branch based on their actions to create a truly personalized experience.",
    features: [
      {
        mainSlot: (
          <>
            <span>Tooltip.</span> Point in the right direction.
          </>
        ),
        link: "/features/flow-steps#tooltip",
        icon: Comment16,
      },
      {
        mainSlot: (
          <>
            <span>Modal.</span> Display larger amounts of content.
          </>
        ),
        link: "/features/flow-steps#modal",
        icon: Flows16,
      },
      {
        mainSlot: (
          <>
            <span>Wait.</span> Give users time to complete an action.
          </>
        ),
        link: "/features/flow-steps#wait",
        icon: Hourglass16,
      },
      {
        mainSlot: (
          <>
            <span>Branch.</span> Create conditional paths based on user input.
          </>
        ),
        link: "/features/flow-steps#branch",
        icon: Fork16,
      },
    ],
  },
  {
    title: "Deliver",
    description:
      "Flows are built in pursuit of high-performance. We’ve optimized every aspect of Flows to make sure your users get the best experience possible.",
    features: [
      {
        mainSlot: (
          <>
            <span>Speed as a priority.</span> Show flows instantly.
          </>
        ),
        link: "/features/deliver#speed",
        icon: Hourglass16,
      },
      {
        mainSlot: (
          <>
            <span>Tiny size.</span> Flows script is just{" "}
            <span
              className={css({
                color: "text.primary!",
              })}
            >
              ~20kB
            </span>
          </>
        ),
        link: "/features/deliver#size",
        icon: Storage16,
      },
      {
        mainSlot: (
          <>
            <span>Frequency.</span> Show flows at the right time.
          </>
        ),
        link: "/features/deliver#frequency",
        icon: Versions16,
      },
      {
        mainSlot: (
          <>
            <span>Targeting.</span> Show flows to the right people.
          </>
        ),
        link: "/features/deliver#targeting",
        icon: Filter16,
      },
      {
        mainSlot: (
          <>
            <span>Launch action.</span> Trigger flows from anywhere.
          </>
        ),
        link: "/features/deliver#launch-action",
        icon: Send16,
      },
    ],
  },
  {
    title: "Analyze",
    description:
      "Building truly great user onboarding is part intuition and part data. To help with the data part, Flows offer tools to help you understand how users are interacting with your tours.",
    features: [
      {
        mainSlot: (
          <>
            <span>Flow insights.</span> Optimize for conversion.
          </>
        ),
        link: "/features/analyze#flow-insights",
        icon: Graph16,
      },
      {
        mainSlot: (
          <>
            <span>Error tracking.</span> Spot issues and fix them.
          </>
        ),
        link: "/features/analyze#error-tracking",
        icon: Alert16,
      },
      {
        mainSlot: (
          <>
            <span>Analytics integration.</span> Bring your own analytics.
          </>
        ),
        link: "/features/analyze#analytics-integration",
        icon: Stack16,
      },
    ],
  },
  {
    title: "Modern and secure",
    description:
      "Flows are built with privacy in mind. We don’t track your users, store any of their personal data, and we use only one functional cookie.",
    features: [
      {
        mainSlot: (
          <>
            <span>Privacy fist.</span> We don&apos;t track your users.
          </>
        ),
        link: "/features/secure#privacy-first",
        icon: ShieldLock16,
      },
    ],
  },
];
