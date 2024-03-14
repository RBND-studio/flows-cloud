import { defineConfig } from "@pandacss/dev";
import { theme, conditions, utilities } from "./theme";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme,

  utilities,

  // The output directory for your css system
  outdir: "pandacss-generated",

  jsxFramework: "react",

  minify: true,

  conditions,
});
