import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import type { FlowDetail } from "lib/api";
import type { FC } from "react";
import { Text } from "ui";

import { Frequency } from "./frequency";
import { Start } from "./start";
import { Targeting } from "./targeting";

type Props = {
  flow: FlowDetail;
};

export const SetupSection: FC<Props> = ({ flow }) => {
  const flowIsLocal = flow.flow_type === "local";

  return (
    <Flex
      className={css({
        cardWrap: "-",
      })}
      direction="column"
      gap="space12"
      padding="space16"
      width="100%"
    >
      <Flex alignItems="flex-start" justifyContent="space-between" width="100%">
        <Text variant="titleL">Published setup</Text>
      </Flex>
      <Flex direction="column" gap="space24">
        {flowIsLocal ? (
          <Text color="muted">Check your codebase to see setup of a local flow.</Text>
        ) : null}
        {!flowIsLocal && (
          <>
            <Start flow={flow} />
            <Targeting flow={flow} />
            <Frequency flow={flow} />
          </>
        )}
      </Flex>
    </Flex>
  );
};
