"use client";

import { css } from "@flows/styled-system/css";
import type { Mode } from "@rbnd/react-dark-mode";
import { useDarkMode } from "@rbnd/react-dark-mode";
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

export const ThemeSwitch: FC = () => {
  const { mode, setMode } = useDarkMode();

  return (
    <Select className={css({ width: "100%" })} onChange={setMode} options={options} value={mode} />
  );
};
