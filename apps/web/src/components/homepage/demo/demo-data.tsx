import { Banner16, Comment16, Flows16, Video16 } from "icons";
import { links } from "shared";

import adoptionDark from "./adoption-dark.png";
import adoptionLight from "./adoption-light.png";
import announcementsDark from "./announcements-dark.png";
import announcementsLight from "./announcements-light.png";
import onboardingDark from "./onboarding-dark.png";
import onboardingLight from "./onboarding-light.png";
import tooltipsDark from "./tooltips-dark.png";
import tooltipsLight from "./tooltips-light.png";

export const tabs = [
  {
    icon: Comment16,
    title: "User onboarding",
    imgLight: onboardingLight,
    imgDark: onboardingDark,
  },
  {
    icon: Flows16,
    title: "Feature adoption",
    imgLight: adoptionLight,
    imgDark: adoptionDark,
  },
  {
    icon: Banner16,
    title: "Announcements",
    imgLight: announcementsLight,
    imgDark: announcementsDark,
  },
  {
    icon: Comment16,
    title: "Tooltips",
    imgLight: tooltipsLight,
    imgDark: tooltipsDark,
  },
  {
    icon: Video16,
    title: "Demo video",
    videoUrl: links.demoVideoEmbed,
  },
];
