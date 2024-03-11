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
    title: "Build",
    link: "/features/build",
    features: [
      {
        title: "No-code",
        icon: Cloud16,
        link: "/features/build#no-code",
      },
      {
        title: "In-code",
        icon: Code16,
        link: "/features/build#in-code",
      },
      {
        title: "Preview",
        icon: Eye16,
        link: "/features/build#preview",
      },
    ],
  },
  {
    title: "Flow steps",
    link: "/features/flow-steps",
    features: [
      {
        title: "Tooltip",
        icon: Comment16,
        link: "/features/flow-steps#tooltip",
      },
      {
        title: "Modal",
        icon: Flows16,
        link: "/features/flow-steps#modal",
      },
      {
        title: "Wait",
        icon: Hourglass16,
        link: "/features/flow-steps#wait",
      },
      {
        title: "Branch",
        icon: Fork16,
        link: "/features/flow-steps#branch",
      },
    ],
  },
  {
    title: "Deliver",
    link: "/features/deliver",
    features: [
      {
        title: "Speed as a priority",
        icon: Hourglass16,
        link: "/features/deliver#speed",
      },
      {
        title: "Tiny size",
        icon: Storage16,
        link: "/features/deliver#size",
      },
      {
        title: "Frequency",
        icon: Versions16,
        link: "/features/deliver#frequency",
      },
      {
        title: "Targeting",
        icon: Filter16,
        link: "/features/deliver#targeting",
      },
      {
        title: "Launch action",
        icon: Send16,
        link: "/features/deliver#launch-action",
      },
    ],
  },

  {
    title: "Analyze",
    link: "/features/analyze",
    features: [
      {
        title: "Flow insights",
        icon: Graph16,
        link: "/features/analyze#flow-insights",
      },
      {
        title: "Error tracking",
        icon: Alert16,
        link: "/features/analyze#error-tracking",
      },
      {
        title: "Analytics integration",
        icon: Stack16,
        link: "/features/analyze#analytics-integration",
      },
    ],
  },
  {
    title: "Modern and secure",
    link: "/features/secure",
    features: [
      {
        title: "Privacy first",
        icon: ShieldLock16,
        link: "/features/secure#privacy-first",
      },
    ],
  },
];
