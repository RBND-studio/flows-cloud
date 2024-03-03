import { Flex } from "@flows/styled-system/jsx";
import { Text } from "ui";

export const LocalChip = (): JSX.Element => {
  return (
    <Flex
      background="bg"
      bor="1px"
      borderColor="border.strong"
      borderRadius="radius12"
      paddingX="6px"
    >
      <Text color="muted" weight="600">
        Local flow
      </Text>
    </Flex>
  );
};
