import { defineConfig } from "@pandacss/dev";
import { theme, utilities } from "ui/theme";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["../../packages/ui/src/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  theme,

  utilities,

  // The output directory for your css system
  outdir: "@flows/pandacss",

  jsxFramework: "react",

  emitPackage: true,
  forceConsistentTypeExtension: true,

  minify: true,

  conditions: {
    dark: ".dark &",
  },
});