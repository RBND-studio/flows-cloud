import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import type { FlowDetail } from "lib/api";
import type { FC } from "react";
import { t } from "translations";
import { Text } from "ui";

type Props = {
  flow: FlowDetail;
};

export const Frequency: FC<Props> = ({ flow }) => {
  const frequency = flow.publishedVersion?.frequency;

  return (
    <Flex alignItems="flex-start" direction="column" gap="space8">
      <Text variant="titleS">Frequency</Text>
      {frequency ? (
        <div
          className={css({
            paddingY: "space4",
            paddingX: "space8",
            backgroundColor: "bg.chip",
            bor: "1px",
            borderRadius: "radius8",
          })}
        >
          <Text weight="600">{t.frequency[frequency]}</Text>
        </div>
      ) : (
        <Text color="muted">No frequency</Text>
      )}
    </Flex>
  );
};
