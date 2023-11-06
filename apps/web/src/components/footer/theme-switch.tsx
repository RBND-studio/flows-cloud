"use client";

import { css } from "@flows/styled-system/css";
import type { Mode } from "@rbnd/react-dark-mode";
import { useDarkMode } from "@rbnd/react-dark-mode";
import { useFirstRender } from "hooks";
import type { FC } from "react";

const options: {
  value: Mode;
  label: string;
}[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

const selectWidth = "88px";

export const ThemeSwitch: FC = () => {
  const firstRender = useFirstRender();
  const { mode, setMode } = useDarkMode();
  const handleModeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedMode = event.target.value;
    setMode(selectedMode as Mode);
  };

  if (firstRender)
    return (
      <div
        className={css({
          width: selectWidth,
          height: "29px",
        })}
      />
    );

  return (
    <select
      className={css({
        borderWidth: 1,
        borderColor: "border.strong",
        borderRadius: "radius8",
        padding: "space4",
        backgroundColor: "bg",
        color: "text",
        textStyle: "bodyS",
        transitionDuration: "fast",
        transitionTimingFunction: "easeInOut",
        transitionProperty: "all",
        width: selectWidth,
        "&:hover": {
          backgroundColor: "bg.muted",
          borderColor: "border.primary",
        },
        "&:focus-visible": {
          outline: "none",
          borderColor: "border.primary",
          boxShadow: "focus",
        },
      })}
      onChange={handleModeChange}
      value={mode}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
