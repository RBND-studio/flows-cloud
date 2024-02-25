"use client";

import { css } from "@flows/styled-system/css";
import type { Mode } from "@rbnd/react-dark-mode";
import { useDarkMode } from "@rbnd/react-dark-mode";
import { useFirstRender } from "hooks/use-first-render";
import type { FC } from "react";
import { Select } from "ui";

const options: {
  value: Mode;
  label: string;
}[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

const selectWidth = "100%";

export const ThemeSwitch: FC = () => {
  const firstRender = useFirstRender();
  const { mode, setMode } = useDarkMode();
  const handleModeChange = (value: string): void => {
    setMode(value as Mode);
  };

  if (firstRender)
    return (
      <div
        className={css({
          width: selectWidth,
          height: "28px",
        })}
      />
    );

  return (
    <Select
      className={css({ width: selectWidth })}
      onChange={handleModeChange}
      options={options}
      value={mode}
    />
  );
};
