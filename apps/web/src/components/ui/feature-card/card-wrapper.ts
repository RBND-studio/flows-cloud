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
    boxShadow: "l1",
    textWrap: "balance",

    _after: {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(195deg, rgba(0, 0, 0, 0) 6%, rgba(0, 0, 0, 0.06) 94%)",
      pointerEvents: "none",
      _dark: {
        background:
          "linear-gradient(195deg, rgba(255, 255, 255, 0.04) 6%, rgba(255, 255, 255, 0) 94%)",
      },
    },
  },
  variants: {
    hover: {
      true: {
        fastEaseInOut: "box-shadow, background",
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
