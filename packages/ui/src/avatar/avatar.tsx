"use client";

import { css } from "@flows/styled-system/css";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

type AvatarProps = {
  src?: string;
  fullName?: string;
};

export const Avatar = ({ src, fullName }: AvatarProps): JSX.Element => {
  const fallback = fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <AvatarPrimitive.Avatar
      className={css({
        position: "relative",
        width: "64px",
        height: "64px",
        borderRadius: "radius100",
        overflow: "hidden",
        display: "block",
      })}
    >
      <AvatarPrimitive.AvatarImage className={css()} src={src} />
      <AvatarPrimitive.AvatarFallback
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          bg: "bg.chip",
          color: "text",
        })}
      >
        {fallback}
      </AvatarPrimitive.AvatarFallback>
    </AvatarPrimitive.Avatar>
  );
};
