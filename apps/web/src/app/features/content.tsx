import { css } from "@flows/styled-system/css";
import type { FeatureGridTypes } from "components/feature-grid";
import {
  Alert16,
  Banner16,
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
import { routes } from "routes";

export const featuresData: FeatureGridTypes[] = [
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
        link: `${routes.featuresFlowSteps}#tooltip`,
        icon: Comment16,
      },
      {
        mainSlot: (
          <>
            <span>Modal.</span> Display larger amounts of content.
          </>
        ),
        link: `${routes.featuresFlowSteps}#modal`,
        icon: Flows16,
      },
      {
        mainSlot: (
          <>
            <span>Banner.</span> Announce important information.
          </>
        ),
        link: `${routes.featuresFlowSteps}#banner`,
        icon: Banner16,
      },
      {
        mainSlot: (
          <>
            <span>Wait.</span> Give users time to complete an action.
          </>
        ),
        link: `${routes.featuresFlowSteps}#wait`,
        icon: Hourglass16,
      },
      {
        mainSlot: (
          <>
            <span>Branch.</span> Create conditional paths based on user input.
          </>
        ),
        link: `${routes.featuresFlowSteps}#branch`,
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
        link: `${routes.featuresDeliver}#speed`,
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
        link: `${routes.featuresDeliver}#size`,
        icon: Storage16,
      },
      {
        mainSlot: (
          <>
            <span>Frequency.</span> Show flows at the right time.
          </>
        ),
        link: `${routes.featuresDeliver}#frequency`,
        icon: Versions16,
      },
      {
        mainSlot: (
          <>
            <span>Targeting.</span> Show flows to the right people.
          </>
        ),
        link: `${routes.featuresDeliver}#targeting`,
        icon: Filter16,
      },
      {
        mainSlot: (
          <>
            <span>Start action.</span> Trigger flows from anywhere.
          </>
        ),
        link: `${routes.featuresDeliver}#start-action`,
        icon: Send16,
      },
      {
        mainSlot: (
          <>
            <span>Preview.</span> Test flows before you ship.
          </>
        ),
        link: `${routes.featuresDeliver}#preview`,
        icon: Eye16,
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
        link: `${routes.featuresAnalyze}#flow-insights`,
        icon: Graph16,
      },
      {
        mainSlot: (
          <>
            <span>Error tracking.</span> Spot issues and fix them.
          </>
        ),
        link: `${routes.featuresAnalyze}#error-tracking`,
        icon: Alert16,
      },
      {
        mainSlot: (
          <>
            <span>Analytics integration.</span> Bring your own analytics.
          </>
        ),
        link: `${routes.featuresAnalyze}#analytics-integration`,
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
        link: `${routes.featuresSecure}#privacy-first`,
        icon: ShieldLock16,
      },
    ],
  },
];
