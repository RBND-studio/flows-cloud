import { cva } from "@flows/styled-system/css";

export const cardWrapper = cva({
  base: {
    position: "relative",
    width: "100%",
    flexDirection: "column",
    bor: "1px",
    borderRadius: "radius12",
    backgroundColor: "bg.card",
    overflow: "hidden",
    textWrap: "balance",
  },
  variants: {
    hover: {
      true: {
        boxShadow: "l1",
        fastEaseInOut: "box-shadow, backgroundColor",
        "&:hover": {
          boxShadow: "l2",
          background: "bg.subtleHover",
        },
      },
    },
    reverse: {
      true: {
        flexDirection: "column-reverse",
      },
    },
  },
});
