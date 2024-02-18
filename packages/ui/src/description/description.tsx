import type { ComponentProps, FC, ReactNode } from "react";

import { Text } from "../text";

type Props = {
  children?: ReactNode;
  className?: string;
  color?: ComponentProps<typeof Text>["color"];
};

export const Description: FC<Props> = (props) => {
  return <Text color="subtle" variant="bodyXs" {...props} />;
};
