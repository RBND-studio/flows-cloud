"use client";

import { css } from "@flows/styled-system/css";
import * as Tabs from "@radix-ui/react-tabs";
import type { FC, ReactNode } from "react";
import { Children } from "react";

export const TabsRoot: FC<{ children?: ReactNode; defaultValue: string }> = ({
  children,
  defaultValue,
}) => {
  return (
    <Tabs.Root asChild defaultValue={defaultValue}>
      {children}
    </Tabs.Root>
  );
};

export const TabsList: FC<{ children?: ReactNode; titles: string[] }> = ({ titles, children }) => {
  const tabs = Children.toArray(children);
  return (
    <Tabs.List className={css({ display: "flex" })}>
      {titles.map((title, i) => (
        <Tabs.Trigger asChild key={title} value={title}>
          {tabs[i]}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  );
};

export const TabsContent: FC<{ value: string; children?: ReactNode }> = (props) => {
  return <Tabs.Content {...props} className={css({ position: "relative" })} />;
};
