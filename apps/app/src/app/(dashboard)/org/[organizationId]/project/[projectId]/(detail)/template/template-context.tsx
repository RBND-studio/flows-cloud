"use client";

import type { FC, ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";

type ITemplateContext = {
  cssVars: string;
  cssTemplate: string;
  setCssVars: (vars: string) => void;
  setCssTemplate: (template: string) => void;
};

const TemplateContext = createContext<ITemplateContext>({
  cssTemplate: "",
  cssVars: "",
  setCssTemplate: () => null,
  setCssVars: () => null,
});

type Props = {
  children?: ReactNode;
  cssVars?: string;
  cssTemplate?: string;
};

export const TemplateProvider: FC<Props> = (props) => {
  const [cssVars, setCssVars] = useState(props.cssVars ?? "");
  const [cssTemplate, setCssTemplate] = useState(props.cssTemplate ?? "");

  const value = useMemo(
    (): ITemplateContext => ({
      cssVars,
      cssTemplate,
      setCssTemplate,
      setCssVars,
    }),
    [cssTemplate, cssVars],
  );

  return <TemplateContext.Provider value={value}>{props.children}</TemplateContext.Provider>;
};

export const useTemplate = (): ITemplateContext => useContext(TemplateContext);
