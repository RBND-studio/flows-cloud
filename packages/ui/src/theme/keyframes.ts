import type { CssKeyframes } from "@pandacss/dev";

export const keyframes: CssKeyframes = {
  enter: {
    "0%": { transform: "scale(.95)", opacity: 0 },
    "100%": { transform: "scale(1)", opacity: 1 },
  },
  exit: {
    "0%": { transform: "scale(1)", opacity: 1 },
    "100%": { transform: "scale(.95)", opacity: 0 },
  },
  fadein: {
    "0%": { opacity: "0" },
    "100%": { opacity: "1" },
  },
  fadeout: {
    "0%": { opacity: "1" },
    "100%": { opacity: "0" },
  },
  rotate: {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
  pulse: {
    "0%, 100%": {
      opacity: "1",
    },
    "50%": {
      opacity: ".5",
    },
  },
  topSlideIn: {
    "0%": {
      transform: "translateY(-20px)",
      opacity: 0,
    },
    "100%": {
      transform: "translateY(0)",
      opacity: 1,
    },
  },
};
