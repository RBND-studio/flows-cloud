import { defineUtility } from "@pandacss/dev";

export const bor = defineUtility({
  values: ["1px"],
  transform(value, { token }) {
    return {
      borderStyle: "solid",
      borderWidth: value,
      borderColor: token("colors.border"),
    };
  },
});

export const borBottom = defineUtility({
  values: ["1px"],
  transform(value, { token }) {
    return {
      borderBottomStyle: "solid",
      borderBottomWidth: value,
      borderBottomColor: token("colors.border"),
    };
  },
});

export const borTop = defineUtility({
  values: ["1px"],
  transform(value, { token }) {
    return {
      borderTopStyle: "solid",
      borderTopWidth: value,
      borderTopColor: token("colors.border"),
    };
  },
});

export const borLeft = defineUtility({
  values: ["1px"],
  transform(value, { token }) {
    return {
      borderLeftStyle: "solid",
      borderLeftWidth: value,
      borderLeftColor: token("colors.border"),
    };
  },
});

export const borRight = defineUtility({
  values: ["1px"],
  transform(value, { token }) {
    return {
      borderRightStyle: "solid",
      borderRightWidth: value,
      borderRightColor: token("colors.border"),
    };
  },
});

export const cardWrap = defineUtility({
  values: ["-"],
  transform(_, { token }) {
    return {
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: token("colors.border"),
      borderRadius: token("radii.radius8"),
      backgroundColor: token("colors.bg.card"),
      boxShadow: token("shadows.l1"),
    };
  },
});

export const fastEaseInOut = defineUtility({
  transform(value, { token }) {
    return {
      transitionProperty: value,
      transitionTimingFunction: token("easings.easeInOut"),
      transitionDuration: token(`durations.fast`),
    };
  },
});

export const superFastEaseInOut = defineUtility({
  transform(value, { token }) {
    return {
      transitionProperty: value,
      transitionTimingFunction: token("easings.easeInOut"),
      transitionDuration: token(`durations.superFast`),
    };
  },
});
