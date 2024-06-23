import { cva } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";

// Just lines
export const LinesBox = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element => {
  return (
    <Box bor="1px" position="relative" className={className}>
      {children}
      <div className={corner({ variant: "topLeft" })} />
      <div className={corner({ variant: "topRight" })} />
      <div className={corner({ variant: "bottomRight" })} />
      <div className={corner({ variant: "bottomLeft" })} />
    </Box>
  );
};

// Lines with a subtle background box around the children
export const SingleBoxLinesWrapper = ({ children }): JSX.Element => {
  return (
    <LinesBox>
      <Flex padding="space4" borderRadius="radius16" background="bg.subtle">
        {children}
      </Flex>
    </LinesBox>
  );
};

const corner = cva({
  base: {
    position: "absolute",
    _before: {
      content: '""',
      position: "absolute",
    },
    _after: {
      content: '""',
      position: "absolute",
    },
  },
  variants: {
    variant: {
      topRight: {
        top: 0,
        right: 0,
        _before: {
          top: "-1px",
          width: "80px",
          right: "-80px",
          height: "1px",
          background: "linear-gradient(-90deg, transparent, {colors.border})",
          mdDown: {
            width: "24px",
            right: "-24px",
          },
        },
        _after: {
          top: "-80px",
          height: "80px",
          right: "-1px",
          width: "1px",
          background: "linear-gradient(180deg, transparent, {colors.border})",
          mdDown: {
            height: "24px",
            top: "-24px",
          },
        },
      },
      topLeft: {
        top: 0,
        left: 0,
        _before: {
          top: "-1px",
          width: "80px",
          left: "-80px",
          height: "1px",
          background: "linear-gradient(90deg, transparent, {colors.border})",
          mdDown: {
            width: "24px",
            left: "-24px",
          },
        },
        _after: {
          top: "-80px",
          height: "80px",
          left: "-1px",
          width: "1px",
          background: "linear-gradient(180deg, transparent, {colors.border})",
          mdDown: {
            height: "24px",
            top: "-24px",
          },
        },
      },
      bottomRight: {
        bottom: 0,
        right: 0,
        _before: {
          bottom: "-1px",
          width: "80px",
          right: "-80px",
          height: "1px",
          background: "linear-gradient(-90deg, transparent, {colors.border})",
          mdDown: {
            width: "24px",
            right: "-24px",
          },
        },
        _after: {
          bottom: "-80px",
          height: "80px",
          right: "-1px",
          width: "1px",
          background: "linear-gradient(0deg, transparent, {colors.border})",
          mdDown: {
            height: "24px",
            bottom: "-24px",
          },
        },
      },
      bottomLeft: {
        bottom: 0,
        left: 0,
        _before: {
          bottom: "-1px",
          width: "80px",
          left: "-80px",
          height: "1px",
          background: "linear-gradient(90deg, transparent, {colors.border})",
          mdDown: {
            width: "24px",
            left: "-24px",
          },
        },
        _after: {
          bottom: "-80px",
          height: "80px",
          left: "-1px",
          width: "1px",
          background: "linear-gradient(0deg, transparent, {colors.border})",
          mdDown: {
            height: "24px",
            bottom: "-24px",
          },
        },
      },
    },
  },
});
