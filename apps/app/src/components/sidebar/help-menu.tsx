import { showSurvey } from "components/providers";
import { Book16, Comment16, Log16, Question16, Question24, Slack16 } from "icons";
import type { FC } from "react";
import { links } from "shared";
import { Button, Icon, Menu, MenuItem, MenuSeparator } from "ui";

const options = [
  {
    label: "Documentation",
    icon: Book16,
    href: links.docs.home,
  },
  {
    label: "Contact support",
    icon: Question16,
    href: links.docs.contact,
  },
  {
    label: "Send feedback",
    icon: Comment16,
    onClick: () => showSurvey("feedback-survey"),
  },
  "separator",
  {
    label: "Changelog",
    icon: Log16,
    href: links.changelog,
  },
  {
    label: "Join Slack community",
    icon: Slack16,
    href: links.slack,
  },
];

export const HelpMenu: FC = () => {
  return (
    <Menu
      trigger={
        <Button size="icon" shadow="none" variant="secondary">
          <Icon icon={Question24} />
        </Button>
      }
    >
      {options.map((opt, i) => {
        if (typeof opt === "string") {
          // eslint-disable-next-line react/no-array-index-key -- ignore
          if (opt === "separator") return <MenuSeparator key={i} />;
          return null;
        }

        if (opt.href) {
          return (
            <MenuItem asChild key={opt.label}>
              <a href={opt.href} rel="noopener" target="_blank">
                <Icon icon={opt.icon} />
                {opt.label}
              </a>
            </MenuItem>
          );
        }

        return (
          <MenuItem disabled={!opt.onClick} key={opt.label} onClick={opt.onClick}>
            <Icon icon={opt.icon} />
            {opt.label}
          </MenuItem>
        );
      })}
    </Menu>
  );
};
