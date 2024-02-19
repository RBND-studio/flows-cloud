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
  defaultCssVars?: string;
  defaultCssTemplate?: string;
};

export const TemplateProvider: FC<Props> = ({ children, defaultCssTemplate, defaultCssVars }) => {
  const [cssVars, setCssVars] = useState(defaultCssVars ?? "");
  const [cssTemplate, setCssTemplate] = useState(defaultCssTemplate ?? "");

  const value = useMemo(
    (): ITemplateContext => ({
      cssVars,
      cssTemplate,
      setCssTemplate,
      setCssVars,
    }),
    [cssTemplate, cssVars],
  );

  return <TemplateContext.Provider value={value}>{children}</TemplateContext.Provider>;
};

export const useTemplate = (): ITemplateContext => useContext(TemplateContext);
