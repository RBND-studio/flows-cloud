import { css } from "@flows/styled-system/css";
import type { Extension } from "bright";

const SIZE = 16;

export const fileIcons: Extension = {
  name: "fileIcons",
  TabContent: (props) => {
    const { title } = props;
    const extension = title?.split(".").pop();

    // File icons are stored in public/file-icons in both app and web
    // Additional icons can be found at
    // https://github.com/PKief/vscode-material-icon-theme/tree/main/icons
    const icon = (() => {
      switch (extension) {
        case "js":
          return "javascript";
        case "ts":
          return "typescript";
        case "tsx":
          return "react_ts";
        case "jsx":
          return "react";
        case "css":
          return "css";
        case "json":
          return "json";
        case "html":
          return "html";
        default:
      }
    })();

    return (
      <div className={css({ display: "flex", alignItems: "center" })}>
        {icon ? (
          <img
            alt={icon}
            className={css({ mr: 4 })}
            height={SIZE}
            src={`/file-icons/${icon}.svg`}
            width={SIZE}
          />
        ) : null}
        {title}
      </div>
    );
  },
};
