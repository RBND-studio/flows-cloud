import { css } from "@flows/styled-system/css";
import { ExternalLink16 } from "icons";
import Link from "next/link";
import type { FC, ReactNode } from "react";

type Props = {
  href: string;
  children?: ReactNode;
  target?: string;
  color?: string;
};

export const SmartLink: FC<Props> = (props) => {
  if (props.href.startsWith("http"))
    return (
      <a
        rel={props.target === "_blank" ? "noopener" : undefined}
        {...props}
        className={css({
          display: "inline-flex",
          gap: "space4",
          color: props.color ?? "inherit",
          _hover: { textDecoration: "underline" },
        })}
      >
        {props.children}
        {props.target === "_blank" && <ExternalLink16 />}
      </a>
    );

  return <Link {...props} />;
};
