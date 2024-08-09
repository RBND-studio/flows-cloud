import { defineTextStyles } from "@pandacss/dev";

// Font definition excluding font-family, family is defined in global styles for each app separately because we want to use fancier font on the web but UI focused one in the app

export const textStyles = defineTextStyles({
  title6xl: {
    value: {
      fontStyle: "normal",
      fontWeight: { base: "750", md: "800" },
      fontSize: { base: "40px", sm: "50px", md: "76px" },
      lineHeight: { base: "52px", sm: "64px", md: "80px" },
      fontFamily: "var(--font-main)",
    },
  },
  title5xl: {
    value: {
      fontStyle: "normal",
      fontWeight: "750",
      fontSize: { base: "34px", sm: "42px", md: "60px" },
      lineHeight: { base: "44px", sm: "56px", md: "76px" },
      fontFamily: "var(--font-main)",
    },
  },
  title4xl: {
    value: {
      fontStyle: "normal",
      fontWeight: "750",
      fontSize: { base: "30px", sm: "34px", md: "48px" },
      lineHeight: { base: "40px", sm: "44px", md: "60px" },
      fontFamily: "var(--font-main)",
    },
  },
  title3xl: {
    value: {
      fontStyle: "normal",
      fontWeight: "750",
      fontSize: { base: "26px", sm: "28px", md: "38px" },
      lineHeight: { base: "32px", sm: "32px", md: "48px" },
      fontFamily: "var(--font-main)",
    },
  },
  title2xl: {
    value: {
      fontStyle: "normal",
      fontWeight: "750",
      fontSize: { base: "24px", sm: "24px", md: "30px" },
      lineHeight: { base: "32px", sm: "32px", md: "40px" },
      fontFamily: "var(--font-main)",
    },
  },
  titleXl: {
    value: {
      fontStyle: "normal",
      fontWeight: "750",
      fontSize: { base: "20px", sm: "20px", md: "24px" },
      lineHeight: { base: "28px", sm: "28px", md: "32px" },
      fontFamily: "var(--font-main)",
    },
  },
  titleL: {
    value: {
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "18px",
      lineHeight: "28px",
      fontFamily: "var(--font-main)",
    },
  },
  titleM: {
    value: {
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "16px",
      lineHeight: "24px",
      fontFamily: "var(--font-main)",
    },
  },
  titleS: {
    value: {
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "14px",
      lineHeight: "20px",
      fontFamily: "var(--font-main)",
    },
  },
  titleXs: {
    value: {
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "12px",
      lineHeight: "16px",
      fontFamily: "var(--font-main)",
    },
  },
  // Body
  bodyL: {
    value: {
      fontStyle: "normal",
      fontWeight: "450",
      fontSize: "18px",
      lineHeight: "28px",
      fontFamily: "var(--font-body)",
    },
  },
  bodyM: {
    value: {
      fontStyle: "normal",
      fontWeight: "450",
      fontSize: "16px",
      lineHeight: "24px",
      fontFamily: "var(--font-body)",
    },
  },
  bodyS: {
    value: {
      fontStyle: "normal",
      fontWeight: "450",
      fontSize: "14px",
      lineHeight: "20px",
      fontFamily: "var(--font-body)",
    },
  },
  bodyXs: {
    value: {
      fontStyle: "normal",
      fontWeight: "450",
      fontSize: "12px",
      lineHeight: "16px",
      fontFamily: "var(--font-body)",
    },
  },
});
