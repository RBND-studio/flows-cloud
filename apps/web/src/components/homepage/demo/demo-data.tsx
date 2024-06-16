import { Flows16 } from "icons";

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
    icon: Flows16,
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
    icon: Flows16,
    title: "Announcements",
    imgLight: announcementsLight,
    imgDark: announcementsDark,
  },
  {
    icon: Flows16,
    title: "Tooltips",
    imgLight: tooltipsLight,
    imgDark: tooltipsDark,
  },
];
