import { css, cva, cx } from "@flows/styled-system/css";
import type { SystemProperties } from "@flows/styled-system/types";

export const Section = ({
  children,
  outerClassName,
  innerClassName,
  sectionPadding = "default",
  background = "bg.section",
}: {
  children: React.ReactNode;
  outerClassName?: string;
  innerClassName?: string;
  sectionPadding?: "default" | "none" | "small";
  background?: SystemProperties["backgroundColor"];
}): JSX.Element => {
  return (
    <div
      className={cx(
        css({
          width: "100%",
          paddingX: "space24",
          backgroundColor: background,
        }),
        outerClassName,
      )}
    >
      <div
        className={cx(
          css({
            maxWidth: "960px",
            marginX: "auto",
          }),
          innerClassName,
          padding({ padding: sectionPadding }),
        )}
      >
        {children}
      </div>
    </div>
  );
};

const padding = cva({
  variants: {
    padding: {
      default: {
        paddingY: "space64",
        md: {
          paddingY: "space120",
        },
      },
      small: {
        paddingY: "space40",
        md: {
          paddingY: "space80",
        },
      },
      none: {},
    },
  },
});
