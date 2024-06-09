import { cva } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";

const topRightCorner = cva({
  base: {
    display: "block",
    position: "relative",
    width: "100%",
    height: 0,

    _before: {
      content: '""',
      position: "absolute",
      top: "-1px",
      width: "80px",
      right: "-80px",
      height: "1px",
      background: "linear-gradient(-90deg, transparent, {colors.border})",
    },
    _after: {
      content: '""',
      position: "absolute",
      top: "-80px",
      height: "80px",
      right: "-1px",
      width: "1px",
      background: "linear-gradient(180deg, transparent, {colors.border})",
    },
  },
  variants: {},
});

const topLeftCorner = cva({
  base: {
    display: "block",
    position: "relative",
    width: "100%",
    height: 0,

    _before: {
      content: '""',
      position: "absolute",
      top: "-1px",
      width: "80px",
      left: "-80px",
      height: "1px",
      background: "linear-gradient(90deg, transparent, {colors.border})",
    },
    _after: {
      content: '""',
      position: "absolute",
      top: "-80px",
      height: "80px",
      left: "-1px",
      width: "1px",
      background: "linear-gradient(180deg, transparent, {colors.border})",
    },
  },
  variants: {},
});

const bottomRightCorner = cva({
  base: {
    display: "block",
    position: "relative",
    width: "100%",
    height: 0,

    _before: {
      content: '""',
      position: "absolute",
      bottom: "-1px",
      width: "80px",
      right: "-80px",
      height: "1px",
      background: "linear-gradient(-90deg, transparent, {colors.border})",
    },
    _after: {
      content: '""',
      position: "absolute",
      bottom: "-80px",
      height: "80px",
      right: "-1px",
      width: "1px",
      background: "linear-gradient(0deg, transparent, {colors.border})",
    },
  },
  variants: {},
});

const bottomLeftCorner = cva({
  base: {
    display: "block",
    position: "relative",
    width: "100%",
    height: 0,

    _before: {
      content: '""',
      position: "absolute",
      bottom: "-1px",
      width: "80px",
      left: "-80px",
      height: "1px",
      background: "linear-gradient(90deg, transparent, {colors.border})",
    },
    _after: {
      content: '""',
      position: "absolute",
      bottom: "-80px",
      height: "80px",
      left: "-1px",
      width: "1px",
      background: "linear-gradient(0deg, transparent, {colors.border})",
    },
  },
  variants: {},
});

// Just lines
export const LinesBox = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element => {
  return (
    <Box bor="1px" className={className}>
      <span className={topRightCorner()} />
      <span className={topLeftCorner()} />
      {children}
      <span className={bottomRightCorner()} />
      <span className={bottomLeftCorner()} />
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
