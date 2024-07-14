import {
  Alert16,
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

type Feature = {
  title: string;
  icon: React.FC;
  link: string;
};

export type SidebarSection = {
  title: string;
  link: string;
  features: Feature[];
};

export type SidebarData = SidebarSection[];

export const sidebarData: SidebarData = [
  {
    title: "Flow steps",
    link: routes.featuresFlowSteps,
    features: [
      {
        title: "Tooltip",
        icon: Comment16,
        link: `${routes.featuresFlowSteps}#tooltip`,
      },
      {
        title: "Modal",
        icon: Flows16,
        link: `${routes.featuresFlowSteps}#modal`,
      },
      {
        title: "Wait",
        icon: Hourglass16,
        link: `${routes.featuresFlowSteps}#wait`,
      },
      {
        title: "Branch",
        icon: Fork16,
        link: `${routes.featuresFlowSteps}#branch`,
      },
    ],
  },
  {
    title: "Deliver",
    link: routes.featuresDeliver,
    features: [
      {
        title: "Speed as a priority",
        icon: Hourglass16,
        link: `${routes.featuresDeliver}#speed`,
      },
      {
        title: "Tiny size",
        icon: Storage16,
        link: `${routes.featuresDeliver}#size`,
      },
      {
        title: "Frequency",
        icon: Versions16,
        link: `${routes.featuresDeliver}#frequency`,
      },
      {
        title: "Targeting",
        icon: Filter16,
        link: `${routes.featuresDeliver}#targeting`,
      },
      {
        title: "Start action",
        icon: Send16,
        link: `${routes.featuresDeliver}#start-action`,
      },
      {
        title: "Preview",
        icon: Eye16,
        link: `${routes.featuresDeliver}#preview`,
      },
    ],
  },

  {
    title: "Analyze",
    link: routes.featuresAnalyze,
    features: [
      {
        title: "Flow insights",
        icon: Graph16,
        link: `${routes.featuresAnalyze}#flow-insights`,
      },
      {
        title: "Error tracking",
        icon: Alert16,
        link: `${routes.featuresAnalyze}#error-tracking`,
      },
      {
        title: "Analytics integration",
        icon: Stack16,
        link: `${routes.featuresAnalyze}#analytics-integration`,
      },
    ],
  },
  {
    title: "Modern and secure",
    link: routes.featuresSecure,
    features: [
      {
        title: "Privacy first",
        icon: ShieldLock16,
        link: `${routes.featuresSecure}#privacy-first`,
      },
    ],
  },
];
