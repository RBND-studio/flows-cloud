import { css } from "@flows/styled-system/css";
import { showSurvey } from "components/providers";
import { Book16, Comment16, Question16, Question24, Slack16 } from "icons";
import type { FC } from "react";
import { links } from "shared";
import { Icon, Menu, MenuItem, MenuSeparator } from "ui";

const options = [
  {
    label: "Documentation",
    icon: Book16,
    href: links.docs,
  },
  {
    label: "Contact support",
    icon: Question16,
    href: links.support,
  },
  {
    label: "Send feedback",
    icon: Comment16,
    onClick: () => showSurvey("feedback-survey"),
  },
  // "separator",
  // {
  //   label: "Changelog TODO",
  //   icon: Log16,
  // },
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
        <button
          className={css({
            cursor: "pointer",
            padding: "space4",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "border",
            borderRadius: "100%",
            backgroundColor: "bg",
            fastEaseInOut: "background-color",
            "&:hover": {
              bg: "bg.hover",
            },
          })}
          type="button"
        >
          <Icon icon={Question24} />
        </button>
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
