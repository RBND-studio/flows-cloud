import { css } from "@flows/styled-system/css";

// These styles are used for basic content pages like /privacy or /terms

export const paragraphCss = css({
  my: "space24",

  "& a": {
    color: "text.primary",
    textDecoration: "underline",
  },
});

export const bulletCss = css({
  "&::before": {
    content: "'•'",
    marginRight: "space12",
  },
});

export const headingCss = css({
  mt: "space40",
  mb: "space24",
});
