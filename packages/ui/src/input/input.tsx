import { cva, cx } from "@flows/styled-system/css";
import type { FC, ReactNode } from "react";

type Props = {
  label?: ReactNode;
  /**
   * @defaultValue "medium"
   */
  size?: (typeof input.variantMap.size)[number];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
};

export const Input: FC<Props> = ({ label, size = "medium", ...props }) => {
  return (
    <label>
      {label}
      <div className={inputWrapper()}>
        <input className={cx(input({ size }))} {...props} />
      </div>
    </label>
  );
};

const inputWrapper = cva({
  base: {},
});

const input = cva({
  base: {
    borderRadius: "radius8",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "border.strong",
    backgroundColor: "bg.muted",
    outline: "none",
    transitionDuration: "fast",
    transitionTimingFunction: "easeInOut",
    transitionProperty: "all",
    _focus: {
      borderColor: "border.primary",
    },
  },
  variants: {
    size: {
      large: {
        px: "space16",
        py: "space12",
        textStyle: "bodyL",
      },
      medium: {
        px: "space12",
        py: "space8",
        textStyle: "bodyM",
      },
    },
  },
});