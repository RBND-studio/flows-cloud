"use client";

import { css } from "@flows/styled-system/css";
import type { Mode } from "@rbnd/react-dark-mode";
import { useDarkMode } from "@rbnd/react-dark-mode";
import { useFirstRender } from "hooks";
import { type FC } from "react";
import { Select } from "ui";

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
    <Select
      aria-label="Theme switch"
      className={css({ width: selectWidth })}
      value={mode}
      onChange={setMode}
      options={options}
    />
  );
};
