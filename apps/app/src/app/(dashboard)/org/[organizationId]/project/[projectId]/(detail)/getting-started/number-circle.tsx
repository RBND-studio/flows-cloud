import { Flex } from "@flows/styled-system/jsx";
import type { FC } from "react";

type Props = {
  children: React.ReactNode;
};

export const NumberCircle: FC<Props> = ({ children }) => {
  return (
    <Flex
      alignItems="center"
      background="bg.subtle"
      borderRadius="100%"
      color="text.muted"
      flexShrink={0}
      height="28px"
      justifyContent="center"
      textStyle="titleM"
      width="28px"
    >
      {children}
    </Flex>
  );
};
